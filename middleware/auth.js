const jwt=require('jsonwebtoken')
const User=require('../models/user')

const authenticate=(req,res,next)=>{
    try {
        const token=req.header('Authorization')
        console.log(token)
        const user=jwt.verify(token,'secretkey')
        User.findByPk(user.userId).then(user=>{
            req.user=user
            next()
        })

    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false})
    }
}

module.exports={
    authenticate
}