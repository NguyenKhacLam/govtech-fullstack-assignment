const { Poll } = require("./../models");
const catchAsync = require("../utils/catchAsync");
const optionController = require("./option.controller");
const AppError = require("./../utils/appError");

exports.getAllPolls = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skippedItems = (page - 1) * limit;

  const polls = await Poll.findAll({ offset: skippedItems, limit });

  res.status(200).json({
    status: "success",
    data: {
      data: polls,
    },
  });
});

exports.getPoll = catchAsync(async (req, res, next) => {
  const { pollId } = req.params;

  const poll = await Poll.findOne({ where: { id: pollId } });

  res.status(200).json({
    status: "success",
    data: {
      data: poll,
    },
  });
});

exports.createPoll = catchAsync(async (req, res, next) => {
  const { name, description, options } = req.body;

  const newPoll = await Poll.create({
    name,
    description,
    userId: req.user.id,
  });

  await optionController.bulkInsertOption(newPoll.id, options);

  res.status(201).json({
    status: "success",
    data: {
      data: newPoll,
    },
  });
});

exports.deletePoll = catchAsync(async (req, res, next) => {
  const { pollId } = req.params;

  const poll = await Poll.findOne({ where: { id: pollId } });

  if (!poll) {
    return next(new AppError("Poll does not found!", 400));
  }

  await User.destroy({
    where: {
      pollId,
    },
  });

  res.status(200).json({
    status: "success",
  });
});
