const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const User = require('../models/usermodel')



router.get('/get-all-users',authMiddleware,async(req,res)=>{
    try {
        const users=await User.find({isAdmin:false})
        res.status(200).send({
            message:"Users fetched successfully",
            success:true,
            data:users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"error in fetching users",
            success:false,
            error
        })
    }
})

router.post('/change-user-status',authMiddleware,async(req,res)=>{
    try {
        console.log('llll');
        const userIdd=req.body.userIdd
        console.log(userIdd,'nnn');
        // const userId='6390bc9d71b944330228af9b'
        console.log(userIdd);
        const user=await User.findById({_id:userIdd})
        console.log(user);
        if(user.isActive){
            console.log('undayittalla');
            user.isActive=false
        }else{
            user.isActive=true
        }
        await user.save()
        const users=await User.find({isAdmin:false})
        res.status(200).send({
            message:"Users-status change successfully",
            success:true,
            data:users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"error in fetching users",
            success:false,
            error
        })
    }
})

module.exports=router