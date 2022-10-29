const UsersService = require('../services/users.services')
const Joi = require('../util/joi');
const bcrypt = require('bcrypt');

class UsersController{
    usersService = new UsersService();
    
    //회원가입
    signup = async(req,res,next)=>{
        try{
            const {email,name,password,confirm,gender,birth} =
            await Joi.signupSchema.validateAsync(req.body);
    
            if(!email || !name || !password || !confirm || !gender || !birth){
                return res.status(400).send({
                    ok: false, errorMessage : '형식을 확인해주세요.'
                });
            }
            

            if(password !== confirm){
                return res.status(400).send({
                    ok: false, errorMessage : '비밀번호가 일치하지 않습니다.'
                });
            }
            const emailCheck = await this.usersService.emailDuplicates(email)
            if(emailCheck){
                return res.status(400).send({
                    ok:false, errorMessage: '이메일 중복검사를 해주세요.'
                })
            }
    
            if(name.includes(password) || password.includes(name)){
                return res.status(400).send({
                    ok:false, errorMessage : '이름과 비밀번호를 다른형식으로 설정해주세요'
                })
            }
    
            const hashed = await bcrypt.hash(password, 10);
            const users = await Object.create({email :email,name:name,password:hashed,gender:gender,birth:birth})
            
            await this.usersService.createUser(users);
            res.status(201).json({message:"회원가입에 성공하셨습니다."})
        }catch(error){
            next(error)
        }
    }
    //로그인
    login = async(req,res,next)=>{
        try {
            const {email, password}=await Joi.loginSchema.validateAsync(req.body);
            const user = await this.usersService.userLogin(email,password);
            res.cookie('accessToken',user.accessToken);
            res.cookie('refreshToken',user.refreshToken);
            res.status(200).json({
                email: user.email,
                userId : user.userId,
                accessToken : user.accessToken,
                refreshToken:user.refreshToken,
                message:'로그인에 성공하였습니다',
            });
        }catch(error){
        next(error);  
        }
    };
}

module.exports = UsersController