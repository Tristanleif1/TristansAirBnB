"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getImageable(options) {
      if (!this.imageableType) return Promise.fulfill(null);
      let type = `get${this.imageableType}`;
      return this[type](options);
    }

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
      imageableId:{
     type: DataTypes.INTEGER,
     allowNull: false
      },
      imageableType: {
        type: DataTypes.STRING,
        allowNull:false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
