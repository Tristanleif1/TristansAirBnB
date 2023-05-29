const express = require("express");
const router = express.Router();

const {
  Spot,
  User,
  Image,
  Review,
  Booking,
  sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
// const booking = require("../../db/models/booking");
const spot = require("../../db/models/spot");
const e = require("express");
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

const validReview = [
  check("review")
    .notEmpty()
    .withMessage("Review Text is required")
    .isLength({ max: 500 })
    .withMessage("Review must be less than 500 characters"),
  check("stars")
    .notEmpty()
    .withMessage("Stars must be an integer from 1 to 5")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validBooking = [
  check("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be a valid date"),
  check("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((endDate, { req }) => {
      const startDate = new Date(req.body["startDate"]);

      if (new Date(endDate) <= startDate) {
        throw new Error("endDate cannot be on or before startDate");
      }

      return true;
    }),
  handleValidationErrors,
];

const validQueryParameters = [
  check("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1"),
  check("maxLat")
    .optional()
    .isFloat()
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .optional()
    .isFloat()
    .withMessage("Minimum latitude is invalid"),
  check("maxLng")
    .optional()
    .isFloat()
    .withMessage("Maximum longitude is invalid"),
  check("minLng")
    .optional()
    .isFloat()
    .withMessage("Minimum longitude is invalid"),
  check("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

//Get all spots with query filters (still not working, only works locally when group: ['spot.id'] is included)

router.get("/", validQueryParameters, async (req, res) => {
  let { minLat, minLng, maxLat, maxLng, minPrice, maxPrice } = req.query;

  let page = parseInt(req.query.page) || 1;
  let size = parseInt(req.query.size) || 20;
  minLat = parseFloat(minLat) || -1000;
  maxLat = parseFloat(maxLat) || 1000;
  maxLng = parseFloat(maxLng) || 1000;
  minLng = parseFloat(minLng) || -1000;
  minPrice = parseFloat(minPrice) || 0;
  maxPrice = parseFloat(maxPrice) || 1000;

  let limit = size;
  let offset = (page - 1) * limit;

  try {
    const rows = await Spot.findAll({
      include: [
        {
          model: Image,
          as: "SpotImages",
          duplicating: false,
          attributes: ["url"],
        },
        {
          model: Review,
          as: "Reviews",
          duplicating: false,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "description",
          "price",
          "createdAt",
          "updatedAt",
          [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
          [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
          // [sequelize.fn("COUNT", sequelize.col("Spot.id")), "numOfEntries"],
        ],
      },
      where: {
        lat: { [Op.between]: [minLat, maxLat] },
        lng: { [Op.between]: [minLng, maxLng] },
        price: { [Op.between]: [minPrice, maxPrice] },
      },
      group: ["Spot.id", "SpotImages.id"],
      limit,
      offset,
    });

    const filteredLocations = rows.map((spot) => ({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: spot.dataValues.avgRating,
      previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
    }));

    return res.status(200).json({
      Spots: filteredLocations,
      page: parseInt(page),
      size: parseInt(size),
    });
  } catch (error) {
    // Handle any errors that occurred during the query or processing
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all spots -- (works when placed beneath get all spots with query filters route)

router.get("/", async (req, res) => {
  try {
    const allSpots = await Spot.findAll({
      include: {
        model: Image,
        as: "SpotImages",
        attributes: ["url"],
        required: false,
        limit: 1,
      },
      // group: ["Spot.id", "SpotImages.id"],
    });

    const spotsWithImage = allSpots.map((spot) => ({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: spot.avgRating !== null ? spot.avgRating.toFixed(2) : null,
      previewImage: spot.SpotImages.length ? spot.SpotImages[0].url : null,
    }));

    const properResponse = {
      Spots: spotsWithImage,
    };
    //   res.json(allSpots);
    // const properResponse = {
    //   Spots: allSpots,
    // };

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
    include: {
      model: Image,
      as: "SpotImages",
      attributes: ["url"],
      required: false,
      limit: 1,
    },
  });

  const spotsWithpreviewImage = mySpots.map((spot) => ({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    avgRating: spot.avgRating,
    previewImage: spot.SpotImages.map((image, idx) => ({
      id: image.id,
      url: image.url,
      preview: idx === 0 ? true : false,
    })),
  }));

  const apiResponse = {
    Spots: spotsWithpreviewImage,
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
      group: ["Spot.id"],
    },
  });

  if (!selectedSpot) {
    return res.status(404).json({ error: "Spot not found" });
  }
  console.log(selectedSpot.SpotImages);
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
    SpotImages: selectedSpot.SpotImages.map((image, idx) => ({
      id: image.id,
      url: image.url,
      preview: idx === 0 ? true : false,
      //   preview: selectedSpot.SpotImages[0].url || null
      //   preview: image.SpotImages?.length ? image.SpotImages[0].url : null,
    })),
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
      preview: newSpotImage.preview,
    };

    res.status(200).json(expectedImageResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Edit details of a spot (work on returning correct error response when an edit request is made to nonexistant spot)

router.put("/:id", requireAuth, validPost, async (req, res) => {
  const spotId = req.params.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const userId = req.user.id;

  try {
    const editedSpot = await Spot.findOne({
      where: { id: spotId, ownerId: userId },
    });
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

    delete editedSpot.dataValues.previewImage;

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
router.post("/:id/reviews", requireAuth, validReview, async (req, res) => {
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

// Get all reviews for a specific Spot

router.get("/:id/reviews", async (req, res) => {
  const specificSpotId = +req.params.id;

  try {
    const spotReviews = await Review.findAll({
      where: { spotId: specificSpotId },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Image,
          as: "ReviewImages",
          attributes: ["id", "url"],
        },
      ],
    });

    if (spotReviews.length === 0) {
      res.status(404).json({ message: "Spot couldn't be found" });
    } else {
      const properReviewFormat = spotReviews.map((review) => {
        return {
          id: review.id,
          userId: review.userId,
          spotId: review.spotId,
          review: review.review,
          stars: review.stars,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          User: {
            id: review.User.id,
            firstName: review.User.firstName,
            lastName: review.User.lastName,
          },
          ReviewImages: review.ReviewImages.map((image) => ({
            id: image.id,
            url: image.url,
          })),
        };
      });

      res.status(200).json({ Reviews: properReviewFormat });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve spot reviews" });
  }
});

//Get all bookings for a spot based on SpotId (check ownerOfSpot endpoint again)

router.get("/:id/bookings", requireAuth, async (req, res) => {
  const specificSpotId = req.params.id;
  const user = req.user.id;

  try {
    const identifiedSpot = await Spot.findByPk(specificSpotId);

    if (!identifiedSpot) {
      res.status(404).json({ message: "Spot couldn't be found" });
      return;
    }

    const allBookings = await Booking.findAll({
      where: { spotId: specificSpotId },
      include: {
        model: User,
        as: "User",
        attributes: ["id", "firstName", "lastName"],
      },
    });

    if (spot.ownerId === user) {
      const ownerOfSpotResponse = allBookings.map((booking) => ({
        User: {
          id: booking.User.id,
          firstName: booking.User.firstName,
          lastName: booking.User.lastName,
        },
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }));
      res.status(200).json({ Bookings: ownerOfSpotResponse });
    } else {
      const nonOwnerResponse = allBookings.map((booking) => ({
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
      }));
      res.status(200).json({ Bookings: nonOwnerResponse });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Create a booking from a Spot based on the Spot's Id

router.post("/:id/bookings", requireAuth, validBooking, async (req, res) => {
  const spotId = req.params.id;
  const { startDate, endDate } = req.body;

  const userId = req.user.id;

  try {
    const identifiedSpot = await Spot.findByPk(spotId);

    if (!identifiedSpot) {
      res.status(404).json({ message: "Spot couldn't be found" });
      return;
    }

    if (identifiedSpot.ownerId === userId) {
      res.status(403).json({
        message: "You are not authorized to book your own spot",
      });
      return;
    }

    const existingBooking = await Booking.findOne({
      where: {
        spotId,
        [Op.or]: [
          {
            startDate: {
              [Op.lte]: endDate,
            },
            endDate: {
              [Op.gte]: startDate,
            },
          },
        ],
      },
    });

    if (existingBooking) {
      res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
      return;
    }

    const newValidBooking = await Booking.create({
      spotId,
      userId,
      startDate,
      endDate,
    });

    res.status(200).json({
      id: newValidBooking.id,
      spotId: newValidBooking.spotId,
      userId: newValidBooking.userId,
      startDate: newValidBooking.startDate,
      endDate: newValidBooking.endDate,
      createdAt: newValidBooking.createdAt,
      updatedAt: newValidBooking.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Add Query Filters to Get All Spots

// if (minLat && maxLat) {
//   queryFormat.where.lat = {
//     [Op.between]: [(minLat),(maxLat)],
//   };
// }
// if (minLng && maxLng) {
//   queryFormat.where.lng = {
//     [Op.between]: [minLng,maxLng],
//   };
// }
// if (minPrice && maxPrice) {
//   queryFormat.where.price = {
//     [Op.between]: [minPrice,maxPrice],
//   };
//

module.exports = router;
