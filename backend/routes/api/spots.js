const express = require("express");
const router = express.Router();

const { Spot, User, Image } = require("../../db/models");
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
//GET the current user's spots
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

//Get details about a spot
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

//Post a spot

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

//Post an image to a spot

router.post("/:id/images", requireAuth, async (req, res) => {
  const spotId = req.params.id;
  const { url, preview } = req.body;
  const userId = req.user.id;

  try {
    const spot = await Spot.findOne({ where: { id: spotId, ownerId: userId } });
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const newSpotImage = await Image.create({
      url,
      imageableId: spotId,
      imageableType: "Spot",
    });

    const expectedImageResponse = {
      id: newSpotImage.id,
      url: newSpotImage.url,
    };

    res.status(200).json(expectedImageResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Edit details of a spot

router.put("/:id", requireAuth, async (req, res) => {
  const spotId = req.params.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const userId = req.user.id;

  try {
    const editedSpot = await Spot.findOne({ id: spotId, ownerId: userId });
    if (!editedSpot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    await editedSpot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    res.status(200).json(editedSpot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error " });
  }
});

//Delete a Spot

router.delete("/:id", requireAuth, async (req, res) => {
  const spotId = +req.params.id;
  const deleteSpot = await Spot.findByPk(spotId);
  if (deleteSpot) {
    await deleteSpot.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } else
    res.status(404).json({
      message: "Spot couldn't be found",
    });
});

module.exports = router;
