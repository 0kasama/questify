"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associate Level with User model
      Level.hasMany(models.User, {
        foreignKey: "levelId",
      });
    }
  }

  Level.init(
    {
      level: DataTypes.INTEGER,
      expRequire: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Level",
      timestamps: true
    }
  );

  return Level;
};
