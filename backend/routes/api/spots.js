const express = require("express");
const router = express.Router();

const { Spot, User, Image, Review, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
// const { Op, json } = require("sequelize");

const validPost = [
  check("address")
    .notEmpty()
    .withMessage("Street address is required.")
    .isLength({ max: 49 })
    .withMessage("Address must be less than 50 characters."),
  check("city")
    .notEmpty()
    .withMessage("City is required.")
    .isLength({ max: 49 })
    .withMessage("City must be less than 50 characters."),
  check("state")
    .notEmpty()
    .withMessage("State is required.")
    .isLength({ max: 49 })
    .withMessage("State must be less than 50 characters."),
  check("country")
    .notEmpty()
    .withMessage("Country is required.")
    .isLength({ max: 49 })
    .withMessage("Country must be less than 50 characters."),
  check("lat")
    .notEmpty()
    .withMessage("Latitude is required.")
    .isDecimal()
    .withMessage("Latitude is not valid"),
  check("lng")
    .notEmpty()
    .withMessage("Longitude is required.")
    .isDecimal()
    .withMessage("Longitude is not valid"),
  check("name")
    .notEmpty()
    .withMessage("Name must be less than 50 characters.")
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters."),
  check("description")
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ max: 200 })
    .withMessage("Description must be less than 200 characters."),
  check("price")
    .notEmpty()
    .withMessage("Price per day is required.")
    .isDecimal({ min: 5, max: 10000 })
    .withMessage("Price per day is required."),
  handleValidationErrors,
];

//Get all spots -- needs to be worked on

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

//Get details about a spot (how to add preview: true key value pair in response?)
router.get("/:id", async (req, res) => {
  const id = +req.params.id;

  const selectedSpot = await Spot.findByPk(id, {
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Image,
        as: "SpotImages",
        attributes: ["id", "url"],
      },
      {
        model: Review,
        as: "Reviews",
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
      ],
    },
  });

  if (!selectedSpot) {
    return res.status(404).json({ error: "Spot not found" });
  }

  //   const numOfReviews = await selectedSpot.countReviews();
  const specificSpotDetails = {
    id: selectedSpot.id,
    ownerId: selectedSpot.ownerId,
    address: selectedSpot.address,
    city: selectedSpot.city,
    state: selectedSpot.state,
    country: selectedSpot.country,
    lat: selectedSpot.lat,
    lng: selectedSpot.lng,
    name: selectedSpot.name,
    description: selectedSpot.description,
    price: selectedSpot.price,
    createdAt: selectedSpot.createdAt,
    updatedAt: selectedSpot.updatedAt,
    numReviews: selectedSpot.dataValues.numReviews,
    avgStarRating: selectedSpot.dataValues.avgStarRating,
    SpotImages: selectedSpot.SpotImages,
    Owner: {
      id: selectedSpot.Owner.id,
      firstName: selectedSpot.Owner.firstName,
      lastName: selectedSpot.Owner.lastName,
    },
  };
  res.status(200).json(specificSpotDetails);
});

//Post a spot

router.post("/", requireAuth, validPost, async (req, res) => {
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
      preview: newSpotImage.preview
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

// Create a Review for a Spot based on Spot's id
router.post("/:id/reviews", requireAuth, async (req, res) => {
  const spotId = req.params.id;
  const { review, stars } = req.body;
  const userId = req.user.id;

  try {
    const selectedSpot = await Spot.findByPk(spotId);
    if (!selectedSpot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    const reviewExists = await Review.findOne({
      where: {
        userId: userId,
        spotId: spotId,
      },
    });
    if (reviewExists) {
      return res
        .status(500)
        .json({ message: "User already has a review for this spot " });
    }

    const newReview = await Review.create({
      userId: userId,
      spotId: spotId,
      review: review,
      stars: stars,
    });

    return res.status(201).json(newReview);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
