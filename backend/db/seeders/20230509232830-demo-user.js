"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { User } = require("../models/user");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    await queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Tristan",
          lastName: "Allaman",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "brandwang@user.io",
          username: "bwang234",
          hashedPassword: bcrypt.hashSync("password2"),
          firstName: "Brandon",
          lastName: "Wang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "jareds@user.io",
          username: "js23212",
          hashedPassword: bcrypt.hashSync("password3"),
          firstName: "Jared",
          lastName: "Smailes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "tommy544@user.io",
          username: "tman248",
          hashedPassword: bcrypt.hashSync("password4"),
          firstName: "Tommy",
          lastName: "Kimble",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "maclof@user.io",
          username: "mlofquist321",
          hashedPassword: bcrypt.hashSync("password5"),
          firstName: "Mac",
          lastName: "Lofquist",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const options = {};
    options.tableName = "Users";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "Demo-lition",
            "bwang234",
            "js23212",
            "tman248",
            "mlofquist321",
          ],
        },
      },
      {}
    );
  },
};
