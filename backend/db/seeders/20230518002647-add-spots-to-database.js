"use strict";

/** @type {import('sequelize-cli').Migration} */

const validSpots = [
  {
    ownerId: 1,
    address: "123 Swift Street",
    city: "Thousand Oaks",
    state: "California",
    country: "United States",
    lat: 12.3456789,
    lng: 98.7654321,
    name: "Spot 1",
    description: "This is spot 1",
    price: 160.0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ownerId: 2,
    address: "456 Hader Street",
    city: "Pebble Beach",
    state: "California",
    country: "United States",
    lat: 23.4567891,
    lng: 87.6543219,
    name: "Spot 2",
    description: "This is spot 2",
    price: 200.0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    ownerId: 1,
    address: "789 Mulberry Street",
    city: "Tuscon",
    state: "Arizona",
    country: "United States",
    lat: 34.5678912,
    lng: 76.5432198,
    name: "Spot 3",
    description: "This is spot 3",
    price: 300.0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert("Spots", validSpots, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }

    /**
     * Add seed commands here.
     *
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("Spots", validSpots);
    } catch (err) {
      console.log(err);
      throw err;
    }
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
