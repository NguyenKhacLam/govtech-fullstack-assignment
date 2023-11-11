const Poll = require("./../models/poll.model");
const Option = require("./../models/option.model");
const catchAsync = require("../utils/catchAsync");
const optionController = require("./option.controller");
const AppError = require("./../utils/appError");

const pollController = {
  getAllPolls: catchAsync(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const [polls, total] = await Promise.all([
      Poll.find().skip(skip).limit(limit).sort("-createdAt"),
      Poll.countDocuments(),
    ]);
    // const polls = await Poll.find().sort("-createdAt");

    res.status(200).json({
      status: "success",
      data: {
        polls,
        total,
      },
    });
  }),
  getPoll: catchAsync(async (req, res, next) => {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId)
      .populate({ path: "options" })
      .exec();

    if (!poll) {
      return next(new AppError("Poll does not found!", 400));
    }

    const voteList = poll.options
      .map((option) => option.votes.flatMap((i) => i._id.toString()))
      .flatMap((i) => i);

    const userCanVote =
      !voteList.includes(req.user.id) && poll.userId.toString() !== req.user.id;

    const data = {
      name: poll.name,
      description: poll.description,
      userId: poll.userId,
      updatedAt: poll.updatedAt,
      options: poll.options,
      userCanVote,
      totalVote: poll?.options.reduce(
        (acc, option) => option.votes.length + acc,
        0
      ),
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

    const poll = await Poll.findById({ _id: pollId });

    if (!poll) {
      return next(new AppError("Poll does not found!", 400));
    }

    if (poll.userId.toString() !== req.user.id) {
      return next(new AppError("You can not delete this poll!", 400));
    }

    await Promise.all([
      await Poll.findByIdAndDelete(pollId),
      Option.deleteMany({ pollId }),
    ]);

    res.status(200).json({
      status: "success",
      pollId,
    });
  }),
};

module.exports = pollController;
