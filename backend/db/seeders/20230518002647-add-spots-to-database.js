"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Spot } = require("../models/spot");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Spots", [
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
        address: "365 Shiny Apple Lane",
        city: "Reno",
        state: "Nevada",
        country: "United States",
        lat: 34.5678912,
        lng: 76.5432198,
        name: "Spot 3",
        description: "This is spot 3",
        price: 300.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 3,
        address: "765 Southview Lane",
        city: "Fort Lauderdale",
        state: "Florida",
        country: "United States",
        lat: 58.3238912,
        lng: 84.5432198,
        name: "Spot 4",
        description: "This is spot 4",
        price: 175.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 3,
        address: "645 Cobblestone Way",
        city: "Albany",
        state: "New York",
        country: "United States",
        lat: 98.5678912,
        lng: 34.5432198,
        name: "Spot 5",
        description: "This is spot 5",
        price: 300.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 4,
        address: "322 Spiral Way",
        city: "Austin",
        state: "Texas",
        country: "United States",
        lat: 64.5678912,
        lng: 44.5432232,
        name: "Spot 6",
        description: "This is spot 6",
        price: 280.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 5,
        address: "5427 Tecumsah Lane",
        city: "Cleveland",
        state: "Ohio",
        country: "United States",
        lat: 76.5678912,
        lng: 54.5436232,
        name: "Spot 7",
        description: "This is spot 7",
        price: 210.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    // const options = {}
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Spots");
  },
};

/**
 * Add commands to revert seed here.
 *
 * Example:
 * await queryInterface.bulkDelete('People', null, {});
 */
