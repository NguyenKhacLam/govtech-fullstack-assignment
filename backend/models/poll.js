"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Poll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Option }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.hasMany(Option, { foreignKey: "pollId", as: "options" });
    }
  }
  Poll.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Poll",
      tableName: "poll",
    }
  );
  return Poll;
};
