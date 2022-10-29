const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = async(req,res,next)=>{
    try{
        const {accessToken, refreshToken} = req.headers.auth;
    
        if(!accessToken || !refreshToken){
            throw new InvalidParamsError('로그인 후 사용하세요');
        }
        
        const givemeAccess = accessValidate(accessToken);
        const givemeRefresh = refreshValidate(refreshToken);

        function accessValidate(accessToken){
            try{
                jwt.verify(accessToken, process.env.SECRET_KEY);
                return true;
            }catch(error){
                return false;
            }
        }

        function refreshValidate(refreshToken){
            try{
                jwt.verify(refreshToken,process.env.SECRET_KEY);
                return true;
            }catch(error){
                return false;
            }
        }

        if(!givemeRefresh)
        return res.status(419).json({'message':'다시 로그인 해주시길 바랍니다'})

        if(!givemeAccess){
            const{userId} = jwt.verify(refreshToken,process.env.SECRET_KEY);

        const newAccessToken = jwt.sign({userId:userId}, process.env.SECRET_KEY,{expiresIn:'10d'});

        const user = await userSchema.findByPk(userId);

        res.cookie('accessToken',newAccessToken);
        console.log('토근 재발급');

        res.locals.user=user;
        
    }else{
        const{userId}=jwt.verify(accessToken,process.env.SECRET_KEY);
        const user = await userSchema.findByPk(userId);
        res.locals.user =user;
    }
    next();
    }catch(error){
        console.trace(error);
        return res.status(403).sned({
            errorMessage : '로그인이 필요합니다.'
        });
    }
};