"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Spot } = require("../models/spot");

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots"
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Swift Street",
        city: "Thousand Oaks",
        state: "California",
        country: "United States",
        lat: 12.3456789,
        lng: 98.7654321,
        name: "Maplewood Manor",
        description: "Experience the elegance of Maplewood Manor, where comfort meets classic charm.",
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
        name: "Sunset Haven",
        description: "Bask in the tranquil beauty of Sunset Haven, your perfect retreat for relaxation.",
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
        name: "Pinecrest Villa",
        description: "Enjoy a serene escape at Pinecrest Villa, nestled among towering pines.",
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
        name: "Oakridge Retreat",
        description: "Find peace and privacy at Oakridge Retreat, a haven of natural beauty.",
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
        name: "Hillside Hideaway",
        description: "Discover the ultimate escape at Hillside Hideaway, perched on a scenic hillside.",
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
        name: "Cedarbrook Cottage",
        description: "Cozy up in Cedarbrook Cottage, a charming abode surrounded by nature.",
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
        name: "Meadowview Estate",
        description: "Revel in the open spaces of Meadowview Estate, with sweeping views of lush meadows.",
        price: 210.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 2,
        address: "3212 Price Street",
        city: "Richland",
        state: "Washington",
        country: "United States",
        lat: 46.4567891,
        lng: 119.6543219,
        name: "Brookside Bliss",
        description: "Savor the tranquility of Brookside Bliss, where the brook’s melody soothes your soul.",
        price: 220.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 4,
        address: "5424 Sandford Ave",
        city: "Boardman",
        state: "Oregon",
        country: "United States",
        lat: 46.4567234,
        lng: 109.6544352,
        name: "Sandford Sanctuary",
        description: "Relax in the warmth of Sandford Sanctuary, your sunny suburban getaway.",
        price: 170.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 2,
        address: "2342 Via Vienta Ave",
        city: "Malibu",
        state: "California",
        country: "United States",
        lat: 22.2467234,
        lng: 75.3424352,
        name: "Ocean Escape",
        description: "Enjoy a tranquil, relaxing stay at this Malibu residence perched on top of a hill overlooking the ocean",
        price: 370.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    // const options = {}
     const Op = Sequelize.Op;
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, {
        ownerId: { [Op.in]: [1,2,3,4,5]}
    },
  {});
}
};

/**
 * Add commands to revert seed here.
 *
 * Example:
 * await queryInterface.bulkDelete('People', null, {});
 */
