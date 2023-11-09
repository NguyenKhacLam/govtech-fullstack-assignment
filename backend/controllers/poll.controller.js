const { Poll, Vote } = require("./../models");
const catchAsync = require("../utils/catchAsync");
const optionController = require("./option.controller");
const AppError = require("./../utils/appError");

const pollController = {
  getAllPolls: catchAsync(async (req, res, next) => {
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
  }),
  getPoll: catchAsync(async (req, res, next) => {
    const { pollId } = req.params;

    const [poll, options, totalVote] = await Promise.all([
      Poll.findOne({ where: { id: pollId } }),
      optionController.getAllOptionWithVotedCount(pollId),
      Vote.count({ where: { pollId } }),
    ]);

    const data = {
      name: poll.name,
      description: poll.description,
      createdAt: poll.createdAt,
      updatedAt: poll.updatedAt,
      totalVote,
      options,
    };

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  }),
  createPoll: catchAsync(async (req, res, next) => {
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
  }),
  deletePoll: catchAsync(async (req, res, next) => {
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
  }),
};

module.exports = pollController;
