"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
const { Spot, Review, Image } = require("../models");
// const spot = require("../models/spot");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Images";
    const imageData = [
      {
        url: "https://images.app.goo.gl/hgPHqqCrXmTYfg6H8",
        imageableId: 1,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://images.app.goo.gl/YVeJ5QMUaQpLFz6k7",
        imageableId: 2,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://images.app.goo.gl/e2zrW6q9F6HAvNGj6",
        imageableId: 3,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://images.app.goo.gl/e2zrW6q9F6HAvNGj6",
        imageableId: 4,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://images.app.goo.gl/Em9ta5GggCDyDxdGA",
        imageableId: 5,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://images.app.goo.gl/CGm486t35Kb2Ggvj7",
        imageableId: 6,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://images.app.goo.gl/fo7yzbvoZ1noE9vo9",
        imageableId: 7,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://images.app.goo.gl/AwfbUraxw6ohsZAy8",
        imageableId: 1,
        imageableType: "Review",
        preview: true,
      },
      {
        url: "https://images.app.goo.gl/66creWdZCXgSt1jm9",
        imageableId: 2,
        imageableType: "Review",
        preview: false,
      },
      {
        url: "https://images.app.goo.gl/m34b38nDX5Ksr6jx5",
        imageableId: 3,
        imageableType: "Review",
        preview: true,
      },
      {
        url: "https://images.app.goo.gl/ZM4C79uZMWs8girBA",
        imageableId: 4,
        imageableType: "Review",
        preview: false,
      },
      {
        url: "https://images.app.goo.gl/odfKdBkPpdQtmkSv7",
        imageableId: 5,
        imageableType: "Review",
        preview: false,
      },
    ];

    await queryInterface.bulkInsert(options.tableName, imageData);

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

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = "Images";
    await queryInterface.bulkDelete(
      options.tableName,
      {
        id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      },
      {}
    );

    /**.
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
