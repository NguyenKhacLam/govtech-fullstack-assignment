const AppError = require("./../../utils/appError");

module.exports = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body);
    return next();
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
