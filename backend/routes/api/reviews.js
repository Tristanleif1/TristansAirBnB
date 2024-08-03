const express = require("express");
const router = express.Router();

const { Spot, User, Image, Review, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

//GET ALL REVIEWS OF THE CURRRENT USER
const validReview = [
  check("review")
    .notEmpty()
    .withMessage("Review Text is required")
    .isLength({ max: 500 })
    .withMessage("Review must be less than 500 characters"),
  check("stars")
    .notEmpty()
    .withMessage("Stars value is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

router.get("/myReviews", requireAuth, async (req, res) => {
  const { user } = req;

  try {
    const myReviews = await Review.findAll({
      where: { userId: user.id },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Spot,
          as: "Spot",
          attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "price",
          ],
          include: [
            {
              model: Image,
              as: "SpotImages",
              attributes: ["id", "url"],
            },
          ],
        },
        {
          model: Image,
          as: "ReviewImages",
          attributes: ["id", "url"],
        },
      ],
    });

    const formattedReviews = myReviews.map((review) => {
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
        Spot: {
          id: review.Spot.id,
          ownerId: review.Spot.ownerId,
          address: review.Spot.address,
          city: review.Spot.city,
          state: review.Spot.state,
          country: review.Spot.country,
          lat: review.Spot.lat,
          lng: review.Spot.lng,
          name: review.Spot.name,
          price: review.Spot.price,
          previewImage: review.Spot.SpotImages.length
            ? review.Spot.SpotImages[0].url
            : null,
        },
        ReviewImages: review.ReviewImages.map((image) => ({
          id: image.id,
          url: image.url,
        })),
      };
    });

    res.status(200).json({ Reviews: formattedReviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve reviews" });
  }
});

//Add an Image to a Review based on the Review's Id
router.post("/:id/images", requireAuth, async (req, res) => {
  const reviewId = req.params.id;
  const { url } = req.body;
  const userId = req.user.id;

  try {
    //
    const review = await Review.findOne({
      where: { id: reviewId, userId },
    });

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    const imageCount = await Image.count({
      where: { imageableId: reviewId, imageableType: "Review" },
    });

    if (imageCount >= 10) {
      return res.status(403).json({
        message: "Maximum number of images for this resource was reached",
      });
    }

    const newReviewImage = await Image.create({
      url,
      imageableId: reviewId,
      imageableType: "Review",
    });

    const expectedReviewResponse = {
      id: newReviewImage.id,
      url: newReviewImage.url,
    };

    res.status(200).json(expectedReviewResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Edit a Review

router.put("/:id", requireAuth, validReview, async (req, res) => {
  const reviewId = req.params.id;
  const { review, stars } = req.body;

  const userId = req.user.id;

  try {
    const editedReview = await Review.findOne({
      where: {
        id: reviewId,
        userId: userId,
      },
    });
    if (!editedReview) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    await editedReview.update({
      review,
      stars,
    });
    res.status(200).json(editedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error " });
  }
});

// Delete a review

router.delete("/:id", requireAuth, async (req, res) => {
  const reviewId = +req.params.id;

  try {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      res.status(404).json({ message: "Review couldn't be found" });
      return;
    }

    // Check if the Review belongs to the current user
    if (review.userId !== req.user.id) {
      res.status(403).json({
        message: "Unauthorized: Review doesn't belong to the current user",
      });
      return;
    }

    // Delete the Review
    await review.destroy();

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
