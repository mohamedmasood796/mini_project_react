const express = require('express')
const router = express.Router()
const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware=require('../middleware/authMiddleware')

router.post('/register', async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(200).send({ message: 'user already exist', success: false })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        await newUser.save()
        res.status(200).json({ message: 'user created successfully', success: true })
    } catch (error) {
        res.status(500).send({ message: 'error creating user', success: false, error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: 'User does not exist', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'password is incorrect', success: false })
        } else {
            //generate token

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                //expire the token within
                expiresIn: "1d"
            })
            res.status(200).send({ message: "Login successful", success: true, data: token })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error loggin", success: false, error })
    }
})

router.post('/get-user-info-by-id',authMiddleware,async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.body.userId})
        user.password=undefined
        if(!user){
            return res.status(200).send({message:"Userr does not exist",success:false})
        }else{
            res.status(200).send({success:true,data:user})
        }
    } catch (error) {
        res.status(500).send({
            message:"Error getting user-info",success:false,error
        })
    }
})

router.post('/update-profile',authMiddleware,async(req,res)=>{
    try {
        const updateImage=req.body.imageUpdate
        console.log(updateImage);
        const user=await User.findOne({_id:req.body.userId})

        if(!user){
            return res.status(200).send({message:"Userr does not exist",success:false})
        }else{
            user.image=updateImage
            await user.save()
            res.status(200).send({message:"update profile successfully",success:true})
        }

    } catch (error) {
        res.status(500).send({
            message:"Error getting user-info",success:false,error
        })
    }
})
module.exports = router;