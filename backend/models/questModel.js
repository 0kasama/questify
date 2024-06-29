"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Quest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quest.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }

  Quest.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      dueDate: DataTypes.DATE,
      status: DataTypes.ENUM("ongoing", "completed", "expired", "cancelled"),
      priority: DataTypes.ENUM("main", "side"),
      exp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quest",
      timestamps: true,
    }
  );

  return Quest;
};
