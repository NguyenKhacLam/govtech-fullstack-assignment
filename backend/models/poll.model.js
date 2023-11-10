const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Poll must belong to a user."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

pollSchema.virtual("options", {
  ref: "Option",
  foreignField: "pollId",
  localField: "_id",
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
