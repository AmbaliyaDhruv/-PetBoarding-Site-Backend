const { query } = require("express");
const express = require("express");

const router = express.Router();

const Center = require("../model/centerData.model");

router.get("/", async (req, res) => {
  try {
   
    let {city,costPerDay,page} = req.query;
    if(!page){
      page=1;
  }
    let query = {};
    if (city) {
      query.city = city;
    }
    let order=null
    if(costPerDay){
      order={costPerDay:costPerDay}
    }
    let limit=4
    const skip=(page-1)*limit;
    
    const centers = await Center.find(query).sort(order).limit(limit).skip(skip).lean().exec();

    res.status(200).send(centers);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/count",async(req,res)=>{
  try { 

    const count = await Center.countDocuments();
     return res.send({count})
  } catch (error) {
    return res.send(error.message)
  }
})

router.get("/:id",async(req,res)=>{
  try {
     
    const center = await Center.findById(req.params.id).lean().exec();
    res.status(200).send(center);
  } catch (error) {
    res.send(error.message);
  }
})

router.post("/", async (req, res) => {
  try {
    const center = await Center.create(req.body);

    res.status(200).send(center);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id",async(req,res)=>{
  try {
       const center = await Center.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(center);
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

router.patch("/:id",async(req,res)=>{
  try {
    const center = await Center.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    res.status(200).send(center);
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

module.exports = router;
