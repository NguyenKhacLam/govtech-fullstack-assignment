const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("./../models");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const authController = {
  signToken: (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },
  createSendToken: (user, statusCode, req, res) => {
    const token = signToken(user.id);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  },
  signup: catchAsync(async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    createSendToken(newUser, 201, req, res);
  }),
  login: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
  }),
  getMe: catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id", "username", "email"],
    });

    delete user.password;

    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  }),
};

module.exports = authController;
