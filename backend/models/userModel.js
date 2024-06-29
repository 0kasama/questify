"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associate User with Level model
      User.belongsTo(models.Level, {
        foreignKey: "levelId",
      });

      // Associate User with Quest model
      User.hasMany(models.Quest, {
        foreignKey: "userId",
      });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      levelId: DataTypes.INTEGER,
      exp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true
    }
  );

  return User;
};
