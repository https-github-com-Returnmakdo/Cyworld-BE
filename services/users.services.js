const UsersRepositories = require('../repositories/users.repositories')
const {Users} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();

class UsersService{
    constructor(){
        this.usersRepositories = new UsersRepositories();  
    }

createUser = async(users) =>{
    const{email,name,password,gender,birth} = users;
    
    await this.usersRepositories.createUser(email,name,password,gender,birth)
    }
emailDuplicates = async(email)=>{
    return await Users.findOne({
        where: {email},
    })
}

userLogin = async(email,password)=>{
    const user = await this.usersRepositories.findOneEmail(email);
    if(!user){
        throw new Error('가입하신 회원이 아닙니다.')
        }
    
    const isEqual = await bcrypt.compare(password,user.password);
    if(!isEqual){
        throw new Error('비밀번호가 다릅니다.')
        }
    const accessToken =jwt.sign(
        {userId :user.userId},
        process.env.SECRET_KEY,
        {expiresIn :'1h'}
        );
        const refreshToken = jwt.sign(
            {userId :user.userId},
            process.env.SECRET_KEY,
            {expiresIn : '14d'}
        );

        console.log(accessToken, 'access토큰 확인');
        console.log(refreshToken, 'refresh토큰 확인');

        await this.usersRepositories.updateRefresh(refreshToken,user);
        
        return {accessToken,refreshToken};
};
}

check =async(email)=>{
    const emailCheck = await this.usersRepositories.findOneEmail(email);
    if(emailCheck){
        throw new Error('이미 가입된 회원입니다')
    }
}


module.exports = UsersService;