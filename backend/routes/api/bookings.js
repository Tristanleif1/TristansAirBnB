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
      const startDate = new Date(req.body.startDate);

      if (new Date(endDate) <= startDate) {
        throw new Error("endDate cannot be on or before startDate");
      }

      return true;
    }),
  handleValidationErrors,
];

//Get all of the Current User's Bookings

router.get("/myBookings", requireAuth, async (req, res) => {
  const { user } = req;

  try {
    const myBookings = await Booking.findAll({
      where: { userId: user.id },
      include: {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Image,
          as: "SpotImages",
          attributes: ["url"],
          where: {
            preview: false,
          },
          required: false,
        },
      },
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"],
      //   },
    });

    const formattedResponses = myBookings.map((booking) => {
      const formattedBooking = {
        id: booking.id,
        spotId: booking.spotId,
        Spot: {
          id: booking.Spot.id,
          ownerId: booking.Spot.ownerId,
          address: booking.Spot.address,
          city: booking.Spot.city,
          state: booking.Spot.state,
          country: booking.Spot.country,
          lat: booking.Spot.lat,
          lng: booking.Spot.lng,
          name: booking.Spot.name,
          price: booking.Spot.price,
          previewImage:
            booking.Spot.SpotImages.length > 0
              ? booking.Spot.SpotImages[0].url
              : null,
        },
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      };
      return formattedBooking;
    });

    res.status(200).json({ Bookings: formattedResponses });
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .json({ message: "Failed to find any bookings for current user" });
  }
});

//Edit a booking
router.put("/:id", requireAuth, validBooking, async (req, res) => {
  const bookingId = req.params.id;
  const { startDate, endDate } = req.body;
  const { user } = req;

  try {
    const editBooking = await Booking.findOne({
      where: { id: bookingId, userId: user.id },
    });

    if (editBooking.userId !== user.id) {
      return res
        .status(403)
        .json({ message: "Can't edit another user's booking" });
    }

    if (!editBooking) {
      res.status(404).json({ message: "Booking couldn't be found" });
    }

    const currentDate = new Date();
    const bookingEndDate = new Date(editBooking.endDate);

    if (bookingEndDate < currentDate) {
      return res
        .status(403)
        .json({ message: "Past bookings can't be modified" });
    }

    const conflictingBooking = await Booking.findOne({
      where: {
        spotId: editBooking.spotId,
        id: { [Op.not]: bookingId },
        startDate: { [Op.lte]: endDate },
        endDate: { [Op.gte]: startDate },
      },
    });

    if (conflictingBooking) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    editBooking.startDate = startDate;
    editBooking.endDate = endDate;
    await editBooking.save();

    res.status(200).json({
      id: editBooking.id,
      spotId: editBooking.spotId,
      userId: editBooking.userId,
      startDate: editBooking.startDate,
      endDate: editBooking.endDate,
      createdAt: editBooking.createdAt,
      updatedAt: editBooking.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete a booking (needs to be adjusted)

router.delete("/:id", requireAuth, async (req, res) => {
  const bookingId = +req.params.id;
  const { user } = req;

  try {
    const deleteBooking = await Booking.findByPk(bookingId);

    if (!deleteBooking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (deleteBooking.userId !== user.id) {
      return res
        .status(403)
        .json({ message: "Can't delete another user's bookings" });
    }

    // if (!deleteBooking) {
    //   return res.status(404).json({ message: "Booking couldn't be found" });
    // }

    const currentDate = new Date();
    const bookingStartDate = new Date(deleteBooking.startDate);

    if (bookingStartDate <= currentDate) {
      return res
        .status(403)
        .json({ message: "Bookings that have started can't be deleted" });
    }

    await deleteBooking.destroy();

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
