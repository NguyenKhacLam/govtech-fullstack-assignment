const Option = require("./../models/option.model");
const Poll = require("./../models/option.model");
const catchAsync = require("../utils/catchAsync");

const optionController = {
  bulkInsertOption: catchAsync(async (pollId, optionsArray) => {
    const newOptionData = optionsArray.map((item) => ({
      name: item.name,
      pollId,
    }));

    const newOptions = await Option.insertMany(newOptionData);

    return newOptions;
  }),
  checkIfUserCanVote: async (pollId, userId) => {
    const poll = await Poll.findOne({ _id: pollId }).populate({
      path: "options",
    });
    let hasVoted = false;
    if (poll) {
      hasVoted = poll.options.some((option) => option.votes.includes(userId));
    }

    return hasVoted;
  },
};

module.exports = optionController;
