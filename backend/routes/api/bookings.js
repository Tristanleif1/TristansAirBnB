const express = require("express");
const router = express.Router();

const { Spot, User, Image, Review, Booking, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

//Get all of the Current User's Bookings

router.get("/myBookings", requireAuth, async (req, res) => {
  const { user } = req;

  const myBookings = await Booking.findAll({
    where: { userId: user.id },
    include: {
      model: Spot,
    },
  });
  res.status(200).json(myBookings);
});

module.exports = router;
