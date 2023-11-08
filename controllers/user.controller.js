const User = require('../models/user.model')

exports.createProfile = async(req,res) => {
    try {
        const {profileData , userId} = req.body

        //check if profile exists or not
        const user = await User.findOne({id:userId});
        if(!user){
            return res.status(400).json({success:false , message:"User not exists"});
        }

        const response = await User.findByIdAndUpdate(userId , profileData);
        if(response){
           const response =  await User.findByIdAndUpdate(response.id , {profileCreated:true , joined:new Date()})
            if(response){
                return res.status(200).json({success:true , message:"Profie created successfully"})
            }
        }else{
            return res.status(200).json({success:true , message:"Some Error occured"})
        }


    } catch (error) {
        
    }
}