const { Sequelize } = require("sequelize");
const { Option, sequelize } = require("./../models");
const catchAsync = require("../utils/catchAsync");

exports.getAllOptionWithVotedCount = catchAsync(async (req, res, next) => {
  const { pollId } = req.params;

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

  res.status(200).json({
    status: "success",
    data: {
      data: results,
    },
  });
});

exports.bulkInsertOption = catchAsync(async (pollId, optionsArray) => {
  const newOptionData = optionsArray.map((item) => ({
    name: item.name,
    pollId,
  }));

  const newOptions = await Option.bulkCreate(newOptionData);

  return newOptions;
});
