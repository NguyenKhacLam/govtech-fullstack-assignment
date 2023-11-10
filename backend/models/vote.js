"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  Vote.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      optionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Vote",
      tableName: "vote",
      indexes: [
        {
          unique: true,
          fields: ["userId", "pollId", "optionId"],
        },
      ],
    }
  );
  return Vote;
};
