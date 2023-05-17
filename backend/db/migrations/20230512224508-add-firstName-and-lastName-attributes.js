"use strict";
let options = {};
options.schema = "tristan_airbnb";
options.tableName = "Users";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(options, "firstName", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn(options, "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, "firstName");
    await queryInterface.removeColumn(options, "lastName");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
