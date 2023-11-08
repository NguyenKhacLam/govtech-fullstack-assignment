const { Sequelize } = require("sequelize");
const { Option, sequelize } = require("./../models");
const catchAsync = require("../utils/catchAsync");

exports.getAllOptionWithVotedCount = catchAsync(async (req, res, next) => {
  const { pollId } = req.params;

  const query = `
    SELECT o.*, count(v.user_id) as number_of_vote from "option" o
    LEFT JOIN user_voted v on v.option_id = o."id"
    WHERE o.poll_id = :pollId
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
