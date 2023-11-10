const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const globalErrorHandler = require("./controllers/error.controller");
const userRouter = require("./routes/user.route");
const pollRouter = require("./routes/poll.route");
const voteRouter = require("./routes/vote.route");
const optionRouter = require("./routes/option.route");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const AppError = require("./utils/appError");

const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/polls", pollRouter);
app.use("/api/v1/votes", voteRouter);
app.use("/api/v1/options", optionRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
