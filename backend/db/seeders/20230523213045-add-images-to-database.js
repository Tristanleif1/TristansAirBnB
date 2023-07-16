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
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772065/ab56a5a91431644dc57e031e9b665a54w-c176303xd-w640_h480_q80_nyxpc4.jpg",
        imageableId: 1,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689533239/480A0895-2-scaled_wgpywv.jpg",
        imageableId: 1,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689533225/open_two_story_foyer_in_a_traditional_suburban_home_-_here_27s_how_we_updated_this_space_to_make_it_feel_fresh_u8cbpv.jpg",
        imageableId: 1,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689533204/0f07df55e94a9144f476913271b5a2c4_i1fcfe.jpg",
        imageableId: 1,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772383/MCH-L-BUSINESS-0130-1_xjj1aa.jpg",
        imageableId: 2,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772462/GK-Wealth_ro4jyx.jpg",
        imageableId: 3,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772608/1168ESrd_900x600_qbvn33.jpg",
        imageableId: 4,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772685/1200x0_stqwkb.jpg",
        imageableId: 5,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772772/3D3A5189RT2ABAAB_920_ofjtqs.jpg",
        imageableId: 6,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772843/victorian-style-house-4-1652804696_dkdn9r.jpg",
        imageableId: 7,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772927/113658632-interior-of-messy-home-room-with-scattered-stuff_kfzq1g.jpg",
        imageableId: 1,
        imageableType: "Review",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772986/Beautiful-homes-under-500K-California-2_esy5sy.jpg",
        imageableId: 2,
        imageableType: "Review",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688773053/Contemporary-patio-with-oudtoor-dining-and-barbecue-zone-at-the-Ottawa-home_gdtmyt.jpg",
        imageableId: 3,
        imageableType: "Review",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688773107/00eb6ef5f95cb8868fd5af8f26b6211b_20_dlxyrn.jpg",
        imageableId: 4,
        imageableType: "Review",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688773163/dirty-kitchen-PFKGX9_tdloey.jpg",
        imageableId: 5,
        imageableType: "Review",
        preview: false,
      },
    ];

    await queryInterface.bulkInsert(options, imageData);

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
      options,
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
