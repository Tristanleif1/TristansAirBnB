"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Spot.hasMany(models.Booking, {foreignKey: 'userId'})
      Spot.hasMany(models.Review, { foreignKey: "spotId", as: "Reviews" });
      Spot.hasMany(models.Booking, { foreignKey: "spotId" });
      Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" });
      Spot.hasMany(models.Image, {
        foreignKey: "imageableId",
        as: "SpotImages",
        constraints: false,
        scope: {
          imageableType: "Spot",
        },
      });
      // Spot.hasMany(models.Image, {
      //   foreignKey: "imageableId",
      //   as: "previewImage",
      //   constraints: false,
      //   scope: {
      //     imageableType: "Spot",
      //   },
      // });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Street address is required",
          },
          len: {
            args: [1, 49],
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "City is required",
          },
          len: {
            args: [1, 49],
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "State is required",
          },
          len: {
            args: [1, 49],
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Country is required",
          },
          len: {
            args: [1, 49],
          },
        },
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Latitude is not valid",
          },
          isDecimal: {
            msg: "Latitude must be a valid decimal number",
          },
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Longitude is not valid",
          },
          isDecimal: {
            msg: "Longtitude must be a valid decimal number",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          len: {
            args: [1, 49],
            msg: "Name must be less than 50 characters",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: "Description is required",
        },
        len: {
          args: [1, 200],
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price per day is required",
          },
          max: 10000,
          min: 5,
        },
      },
      previewImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
