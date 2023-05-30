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

//Delete a spot image belonging to authenticated user

router.delete("/spots/:id", requireAuth, async (req, res) => {
  const imageId = +req.params.id;
  const userId = req.user.id;

  try {
    const image = await Image.findOne({
      where: {
        id: imageId,
        imageableType: "Spot",
      },
      include: {
        model: Spot,
        as: "spot",
        where: { ownerId: userId },
        attributes: ["ownerId"],
      },
    });

    if (!image) {
      res.status(404).json({ message: "Spot Image couldn't be found" });
      return;
    }

    await image.destroy();

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Deletes a review image belonging to an authenticated user

router.delete("/reviews/:id", requireAuth, async (req, res) => {
  const imageId = +req.params.id;
  const userId = req.user.id;

  try {
    const image = await Image.findOne({
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

    if (!image) {
      res.status(404).json({ message: "Review Image couldn't be found" });
      return;
    }

    await image.destroy();

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
