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



router.delete('/:id', requireAuth, async (req, res) => {
    const imageId = +req.params.id;

})

module.exports = router
