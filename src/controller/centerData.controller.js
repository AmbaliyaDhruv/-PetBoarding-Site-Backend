const express = require("express");

const router = express.Router();

const Center = require("../model/centerData.model");

router.get("/", async (req, res) => {
  try {
    const centers = await Center.find().lean().exec();

    res.status(200).send(centers);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const center = await Center.create(req.body);

    res.status(200).send(center);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
