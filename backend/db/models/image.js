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
  Image.addHook("afterFind", (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];

    for (const instance of findResult) {
      if (instance.imageableType === "review" && instance.review !== undefined) {
        instance.imageable = instance.review;
      } else if (instance.imageableType === "spot" && instance.spot !== undefined) {
        instance.imageable = instance.spot;
      }

      // To prevent mistakes:
      delete instance.review;
      delete instance.dataValues.review;
      delete instance.spot;
      delete instance.dataValues.spot;
    }
  });

  return Image;
};
