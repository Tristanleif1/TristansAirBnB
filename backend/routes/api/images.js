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
const { Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");

//Delete a spot image or review image belonging to authenticated user

router.delete("/:id", requireAuth, async (req, res) => {
  const imageId = +req.params.id;
  const userId = req.user.id;

  try {
    const spotImage = await Image.findOne({
      where: {
        id: imageId,
        imageableType: "Spot",
      },
      include: {
        model: Spot,
        as: "spot",
        attributes: ["ownerId"],
      },
    });

    if (!spotImage) {
      res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    if (spotImage) {
      if (spotImage.spot.ownerId !== userId) {
        res.status(403).json({
          message: "You cannot delete a spot image that does not belong to you",
        });
        return;
      }

      await spotImage.destroy();

      res.status(200).json({ message: "Successfully deleted" });
      return;
    }

    const reviewImage = await Image.findOne({
      where: {
        id: imageId,
        imageableType: "Review",
      },
      include: {
        model: Review,
        as: "review",
        where: { userId },
        attributes: ["userId"],
      },
    });

    if (reviewImage) {
      await reviewImage.destroy();

      res.status(200).json({ message: "Successfully deleted" });
      return;
    }

    res.status(404).json({ message: "Review Image couldn't be found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
