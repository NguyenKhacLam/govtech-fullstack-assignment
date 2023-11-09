const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Poll, Option, Vote } = require("./../models");

const voteController = {
  vote: catchAsync(async (req, res, next) => {
    const { pollId, optionId } = req.params;

    if (!pollId || !optionId) {
      return next(new AppError("Missing param", 400));
    }

    const [poll, option] = await Promise.all([
      Poll.findOne({ where: { id: pollId } }),
      Option.findOne({ where: { id: optionId } }),
    ]);

    if (!poll || !option) {
      return next(new AppError("Poll or option is not found", 404));
    }

    //   if (poll.userId === req.user.id) {
    //     return next(new AppError("You can not vote to your own poll", 400));
    //   }

    const isVoted = await Vote.findOne({
      where: [
        { pollId: poll.id },
        { optionId: option.id },
        { userId: req.user.id },
      ],
    });

    if (isVoted) {
      return next(new AppError("You've already voted this poll", 400));
    }

    await Vote.create({
      pollId: poll.id,
      optionId: option.id,
      userId: req.user.id,
    });

    return res.status(200).json({
      status: "success",
      data: {
        data: {
          pollId: Number(pollId),
          optionId: Number(optionId),
        },
      },
    });
  }),
};

module.exports = voteController;
