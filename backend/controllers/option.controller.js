const { Sequelize } = require("sequelize");
const { Option, sequelize } = require("./../models");
const catchAsync = require("../utils/catchAsync");

const optionController = {
  bulkInsertOption: catchAsync(async (pollId, optionsArray) => {
    const newOptionData = optionsArray.map((item) => ({
      name: item.name,
      pollId,
    }));

    const newOptions = await Option.bulkCreate(newOptionData);

    return newOptions;
  }),
  getAllOptionWithVotedCount: async (pollId) => {
    const query = `
      SELECT o.*, CAST(count(v."userId") as INTEGER) as count  from "option" o
      LEFT JOIN vote v ON v."optionId" = o."id"
      WHERE o."pollId" = :pollId
      GROUP BY o."id"
    `;

    const results = await sequelize.query(query, {
      replacements: { pollId },
      type: Sequelize.QueryTypes.SELECT,
    });

    console.log(results);

    return results;
  },
};

module.exports = optionController;
