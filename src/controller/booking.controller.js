
const express=require("express");

const router=express.Router();

const Booking=require("../model/booking.model");

router.get("/",async(req,res)=>{
    try {
         const booking=await Booking.find(req.query).populate("centerId").populate("userId").lean().exec();
          return  res.status(200).send(booking);
    } catch (error) {
        return res.status(400).send(error.message)
    }
})


router.post("/",async(req,res)=>{
 try {
     
        const booking=await Booking.create(req.body);
       return  res.status(200).send(booking);
 } catch (error) {
     return res.status(400).send(error.message)
 }
})


router.patch("/:id",async(req,res)=>{
    try {
         const booking=await Booking.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();

         return res.status(200).send(booking);
    } catch (error) {
        return res.status(400).send(error.message) 
    }
})

router.delete("/:id",async(req,res)=>{
    try {
         const booking=await Booking.findByIdAndDelete(req.params.id).lean().exec();
         return res.status(200).send(booking);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports=router;