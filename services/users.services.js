const UsersRepositories = require('../repositories/users.repositories');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

class UsersService {
 
    usersRepositories = new UsersRepositories();

  createUser = async (users) => {
    const { email, name, password, gender, birth } = users;

    await this.usersRepositories.createUser({
      email:email +"@cyworld.com",
      name:name,
      password:password,
      gender:gender,
      birth:birth,
    });
  };
  
  emailDuplicates = async (email)=>{
    return await this.usersRepositories.findOneEmail({email : email +"@cyworld.com"});
  }

  userLogin = async (email, password) => {
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
        await this.usersRepositories.updateRefresh(refreshToken,user);
        return {accessToken,refreshToken};
  };

  // findOneId =async(userId)=>{
  //   const findOneId = await this.usersRepositories.findOneId(userId)
  //     return{
  //         email:findOneId.email,
  //         name:findOneId.name,
  //         gender:findOneId.gender,
  //         birth:findOneId.birth,
  //         intro:findOneId.intro,
  //   }
  // }
}

module.exports = UsersService;
