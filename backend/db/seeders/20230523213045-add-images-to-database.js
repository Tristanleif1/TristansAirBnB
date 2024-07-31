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
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544339/home19_gkzt0y.jpg",
        imageableId: 2,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544456/0007823_zwiwjr.jpg",
        imageableId: 2,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544507/VisitorsCenter023_pgubwo.jpg",
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
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544643/genIsl.1_3_udvvgr.jpg",
        imageableId: 3,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544643/RenewalbyAndersenofNevada-Reno-NV_l8hvsj.jpg",
        imageableId: 3,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544643/genMid.230007919_0_bbvpsy.jpg",
        imageableId: 3,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544780/4fd62b9669bedd9914000009_y6bn2f.jpg",
        imageableId: 4,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544766/home-interior-design_adkd6j.jpg",
        imageableId: 4,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544765/Hutchings-residence-Dining-room-opt1-R.S_npnvlr.jpg",
        imageableId: 4,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689544765/IMG_4844_rpt5yl.jpg",
        imageableId: 4,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772685/1200x0_stqwkb.jpg",
        imageableId: 5,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689545055/060ae160013a4850bb6ada7512986d3e_hwmezk.jpg",
        imageableId: 5,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689545055/New-York-Retreat_14_ygws7d.jpg",
        imageableId: 5,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689545055/dutch_teaser_700x440_hnclu5.jpg",
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
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689545275/paul-lam-austin-living-room-1643315127.jpg_qo0tam.jpg",
        imageableId: 6,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689545299/D_1367_jk22vk.jpg",
        imageableId: 6,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689545272/D_1204-1_bbo5kc.jpg",
        imageableId: 6,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1688772843/victorian-style-house-4-1652804696_dkdn9r.jpg",
        imageableId: 7,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689545475/norton-1_a4u3rw.jpg",
        imageableId: 7,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689545475/8607311_1200x_ctcwvi.jpg",
        imageableId: 7,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1689545475/09e432_694bef6b15db47cc9ff714e4ea9547f0_mv2_xok1go.jpg",
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
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1722460673/4028373209fc449eacfbe505eaf6fe1d_p53w0v.jpg",
        imageableId: 8,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1722466460/43ef742a65c80cd2ae880a2d94022614_ouiea8.jpg",
        imageableId: 8,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1722466452/family-room_lbi19t.jpg",
        imageableId: 8,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1722463242/w800x533_dgewk1.jpg",
        imageableId: 9,
        imageableType: "Spot",
        preview: true,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1722466456/25-1920x1080-ac9f653444703df3327157d8cc2fb9bf_hlhi7h.jpg",
        imageableId: 9,
        imageableType: "Spot",
        preview: false,
      },
      {
        url: "https://res.cloudinary.com/dtp3p8axg/image/upload/v1722466452/family-room_lbi19t.jpg",
        imageableId: 9,
        imageableType: "Spot",
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
