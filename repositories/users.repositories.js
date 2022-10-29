const {Users} = require('../models');
const {Op} = require('sequelize')
class UsersRepositories{

    createUser = async(email,name,password,gender,birth)=>{
        const createUser = await Users.create({email,name,password,gender,birth});
    return createUser;
    }

    findOneId = async(userId)=>{
        const findOneId = await Users.findOne({Where :{userId}});
        return findOneId
    }

    findOneEmail = async(email)=>{
       const findOneEmail=await Users.findOne({where:{email}})
        return findOneEmail;
    }

    findById = async(userId,email)=>{
        const findById = await Users.findByPk({
            where:{
                [Op.and]:[{userId},{email}],
            }
        });
        return findById
        }

    updateRefresh = async (refreshToken, user) => {
        await Users.update({ refreshToken }, { where: { userId: user.userId } });
    };

}
module.exports = UsersRepositories;