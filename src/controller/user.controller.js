
require("dotenv").config();
const jwt=require("jsonwebtoken");

const newToken=(user)=>{
    return jwt.sign({user},process.env.jwtKey)
}

const express=require("express");

const router=express.Router();


const User=require("../model/user.model");

router.get("/",async(req,res)=>{
    try {
        
        const users=await User.find().lean().exec();
        return res.status(200).send(users);
    } catch (error) {
        
      return  res.status(400).send(error.message)
    }
})

router.post("/signup",async(req,res)=>{
    try {
        let users=await User.findOne({email:req.body.email});
        if(users){
            return res.status(400).send("email already exists")
        }
     users=await User.create(req.body);
    const token=newToken(users)
    return res.status(200).send({users,token});
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.post("/signin",async(req,res)=>{
    try {
         const user=await User.findOne({email:req.body.email});
         if(!user){
                return res.status(400).send("Please try another email or password")
         }

         const match=user.checkPassword(req.body.password);
          if(!match){
                return res.status(400).send("Please try another email or password")
          }

          const token=newToken(user)

            return res.status(200).send({user,token});

    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports=router;