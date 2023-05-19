const express = require("express");
const router = express.Router();

const { Spot } = require("../../db/models/spot");

router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll({
    include: [{ model: Spot }],
  });
  res.json(allSpots);
});

module.exports = router;
