"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Poll }) {
      this.belongsTo(Poll, { as: "poll" });
    }
  }
  Option.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Option",
      tableName: "option",
    }
  );
  return Option;
};
