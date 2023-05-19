const express = require("express");
const router = express.Router();

const { Spot, User } = require("../../db/models");
const { json } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const allSpots = await Spot.findAll();

    //   res.json(allSpots);
    const properResponse = {
      Spots: allSpots,
    };

    res.json(properResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Spots could not be found" });
  }
});




module.exports = router;
