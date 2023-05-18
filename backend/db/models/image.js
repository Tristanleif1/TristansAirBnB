"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Review, {
        as: "review",
        foreignKey: "imageableId",
        constraints: false,
      });
      Image.belongsTo(models.Spot, {
        as: "spot",
        foreignKey: "imageableId",
        constraints: false,
      });
    }
  }
  Image.init(
    {
      imageableId: DataTypes.INTEGER,
      imageableType: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
