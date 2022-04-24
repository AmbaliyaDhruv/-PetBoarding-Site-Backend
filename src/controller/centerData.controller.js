const { query } = require("express");
const express = require("express");

const router = express.Router();

const Center = require("../model/centerData.model");

router.get("/", async (req, res) => {
  try {
   
    const {city,costPerDay} = req.query;
    let query = {};
    if (city) {
      query.city = city;
    }
    let order=null
    if(costPerDay){
      order={costPerDay:costPerDay}
    }
    
    const centers = await Center.find(query).sort(order).lean().exec();

    res.status(200).send(centers);
  } catch (error) {
    res.send(error.message);
  }
});

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
