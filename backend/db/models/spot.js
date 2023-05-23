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
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      previewImg: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
