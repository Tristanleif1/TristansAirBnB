const express = require("express");
const router = express.Router();

const { Spot, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { json } = require("sequelize");

//Get all spots

router.get("/", async (req, res) => {
  try {
    const allSpots = await Spot.findAll();

    //   res.json(allSpots);
    const properResponse = {
      Spots: allSpots,
    };

    res.status(200).json(properResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Spots could not be found" });
  }
});

router.get("/mySpots", requireAuth, async (req, res) => {
  const { user } = req;

  const mySpots = await Spot.findAll({
    where: { ownerId: user.id },
  });

  const apiResponse = {
    Spots: mySpots,
  };
  res.status(200).json(apiResponse);
});

router.get("/:id", async (req, res) => {
  const id = +req.params.id;

  const selectedSpot = await Spot.findByPk(id, {
    include: [
      {
        model: User,
        as: "Owner",
      },
      {
        model: Image,
        as: "SpotImages",
      },
    ],
  });

  res.status(200).json(selectedSpot);

  if (!selectedSpot) {
    return res.status(404).json({ error: "Spot not found" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const ownerId = req.user.id;

  try {
    const newSpot = await Spot.create({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      ownerId,
    });
    res.status(201).json(newSpot);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad Request" });
  }
});

module.exports = router;
