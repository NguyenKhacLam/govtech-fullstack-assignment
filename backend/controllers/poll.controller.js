const { Poll, Vote, Option } = require("./../models");
const catchAsync = require("../utils/catchAsync");
const optionController = require("./option.controller");
const AppError = require("./../utils/appError");

const pollController = {
  getAllPolls: catchAsync(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skippedItems = (page - 1) * limit;

    const polls = await Poll.findAll({
      order: [["createdAt", "DESC"]],
      offset: skippedItems,
      limit,
    });

    res.status(200).json({
      status: "success",
      data: {
        polls,
      },
    });
  }),
  getPoll: catchAsync(async (req, res, next) => {
    const { pollId } = req.params;

    const [poll, options, totalVote, userCanVote] = await Promise.all([
      Poll.findOne({ where: { id: pollId } }),
      optionController.getAllOptionWithVotedCount(pollId),
      Vote.count({ where: { pollId } }),
      Vote.count({ where: { pollId, userId: req.user.id } }),
    ]);

    const data = {
      name: poll.name,
      description: poll.description,
      userId: poll.userId,
      updatedAt: poll.updatedAt,
      updatedAt: poll.updatedAt,
      userCanVote: userCanVote === 0,
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

    if (options.length < 2 || options.length > 5) {
      return next(
        new AppError("Poll must have at least 2 option and max 5 options!", 400)
      );
    }

    const newPoll = await Poll.create({
      name,
      description,
      userId: req.user.id,
    });

    await optionController.bulkInsertOption(newPoll.id, options);

    res.status(201).json({
      status: "success",
      data: {
        newPoll,
      },
    });
  }),
  deletePoll: catchAsync(async (req, res, next) => {
    const { pollId } = req.params;

    const poll = await Poll.findOne({ where: { id: pollId } });

    if (!poll) {
      return next(new AppError("Poll does not found!", 400));
    }

    if (poll.userId !== req.user.id) {
      return next(new AppError("You can not delete this poll!", 400));
    }

    await Promise.all([
      await Poll.destroy({
        where: {
          id: pollId,
        },
      }),
      await Option.destroy({
        where: {
          pollId,
        },
      }),
    ]);

    res.status(200).json({
      status: "success",
      pollId,
    });
  }),
};

module.exports = pollController;
