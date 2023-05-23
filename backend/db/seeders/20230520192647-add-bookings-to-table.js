"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Booking } = require("../models/booking");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Bookings", [
      {
        userId: 1,
        spotId: 2,
        startDate: new Date("2023-06-02"),
        endDate: new Date("2023-06-05"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 3,
        startDate: new Date("2023-06-03"),
        endDate: new Date("2023-06-04"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        spotId: 3,
        startDate: new Date("2023-06-05"),
        endDate: new Date("2023-06-06"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        spotId: 4,
        startDate: new Date("2023-06-05"),
        endDate: new Date("2023-06-06"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        spotId: 5,
        startDate: new Date("2023-06-09"),
        endDate: new Date("2023-06-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        spotId: 6,
        startDate: new Date("2023-06-10"),
        endDate: new Date("2023-06-11"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        spotId: 7,
        startDate: new Date("2023-06-07"),
        endDate: new Date("2023-06-08"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Bookings", null);
  },
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
};
