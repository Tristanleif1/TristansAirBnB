"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: "userId", });
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
      Review.hasMany(models.Image, {
        as: "ReviewImages",
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Review",
        },
      });
    }
  }
  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Review is required",
          },
          len: {
            args: [10, 500],
            msg: "Review must be between 10 and 500 characters",
          },
        },
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stars must be an integer from 1 to 5",
          },
          len: {
            args: [1, 5],
            msg: "Stars must be an integer from 1 to 5",
          },
          isNumeric: {
            msg: "Stars must be an integer from 1 to 5",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
