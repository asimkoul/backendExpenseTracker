const user=require('../models/user')

exports.signup=async (req,res,next)=>{
    try {
        const {name,email,password}=req.body
        if(name==undefined || name.length==0 || email== null || email.length==0 ||
           password==null || password.length==0){
                return res.status(400).json({err:`please complete all the input fields`})
            }
        await user.create({
            name,
            email,
            password
        })
        res.status(201).json({message:'Succesfully created new user'})
    } catch (error) {
        res.status(500).json(error)
    }
}

