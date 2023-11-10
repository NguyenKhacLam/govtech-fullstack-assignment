const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  pollId: {
    type: mongoose.Schema.ObjectId,
    ref: "Poll",
    required: [true, "Option must belong to a poll."],
  },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  count: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
