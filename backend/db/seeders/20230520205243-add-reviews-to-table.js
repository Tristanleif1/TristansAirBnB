"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Review } = require("../models/review");
//CHANGE FIRST SEEDER FOR REVIEWS BECAUSE THAT REVIEW IS LEFT BY THE OWNER OF THE SPOT WHICH SHOULD NOT BE ALLOWED. Example, Tristan is leaving a review for a spot owned by him which doesnt make sense

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 3,
        review:
          "The home was not merely unkempt, it was downright filthy. It felt as though the term cleaning had been lost in translation. Dust bunnies played peekaboo from every corner, forming a gritty reception committee that would have been comical if not so unhygienic.",
        stars: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 4,
        review:
          "Beautiful house with an outdoor pool and jacuzzi, close to downtown Fort Lauderdale. House was very clean and tidy",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        spotId: 1,
        review:
          "Small, quainty suburban household with magnificent marble floors and cobblestone driveway",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        spotId: 4,
        review:
          "This house made visiting Fort Lauderdale totally worth it! Close to downtown and within walking distance to the beach ",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        spotId: 7,
        review:
          " This Victorian style home in Cleveland was beautiful and made our stay in Ohio that much better!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        spotId: 5,
        review:
          "The house boasted several amenities on the listing, but in practice, they were either lacking or below standard. The description promised a fully equipped kitchen, but it lacked essential cookware and utensils. Basic items such as sharp knives and decent pans were conspicuously absent. ",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        spotId: 6,
        review:
          "It was situated in a peaceful neighborhood, away from the hustle and bustle, yet close enough to local attractions. However, the proximity to a busy road occasionally resulted in some traffic noise, which could be bothersome for light sleepers",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        spotId: 2,
        review:
          "The living area was comfortable and provided sufficient space for relaxation. However, it would have been nice to have additional seating options, as the available seating arrangements were limited.",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        spotId: 2,
        review:
          "I recently had the pleasure of staying at an Airbnb in Pebble Beach that surpassed all expectations, leaving me with an unforgettable experience. From start to finish, every aspect of my stay was truly remarkable, earning this property a well-deserved five-star rating.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 3,
        review:
          "House was overall okay, it had a weird, musty smell that hampered the experience",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        spotId: 7,
        review:
          "House was okay, unfortunately it was very loud at night so it was hard to sleep but otherwise it was fine.",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        spotId: 8,
        review:
          "House was beautiful, I could not have asked for a better stay!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 9,
        review:
          "The place was alright. Nice location but some appliances such as the washing machine and dishwasher were faulty. It was an okay experience.",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        spotId: 10,
        review:
          "Awesome location. Spectacular view of the ocean and was indeed a very peaceful stay. The only complaint is that it was bit pricey.",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
      {}
    );
  },
};
