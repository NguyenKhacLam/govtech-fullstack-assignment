const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Poll = require("./../models/poll.model");
const Option = require("./../models/option.model");

const voteController = {
  vote: catchAsync(async (req, res, next) => {
    const { pollId, optionId } = req.params;

    if (!pollId || !optionId) {
      return next(new AppError("Missing param", 400));
    }

    const [poll, option] = await [
      Poll.findById(pollId).populate({ path: "options" }).exec(),
      await Option.findById(optionId),
    ];

    if (!poll || !option) {
      return next(
        new AppError(
          "Poll or option is not found. May be it deleted. Please choose another poll",
          404
        )
      );
    }

    if (poll.userId === req.user.id) {
      return next(new AppError("You can not vote to your own poll", 400));
    }

    const isVoted = option.votes
      .map((i) => i._id.toString())
      .includes(req.user.id);

    if (isVoted) {
      return next(new AppError("You've already voted this poll", 400));
    }

    option.votes.push(req.user.id);
    option.count++;
    await option.save();

    return res.status(200).json({
      status: "success",
      data: {
        pollId,
        optionId,
      },
    });
  }),
};

module.exports = voteController;
