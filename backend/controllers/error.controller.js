const AppError = require("./../utils/appError");

const handleDBConstraintError = (err) => {
  const message = err.errors.map((item) => item.message).join(",");
  return new AppError(message, 500);
};

const handleDBDatabaseError = (err) => {
  return new AppError(err.message, 400);
};

const handleDBValidationError = (err) => {
  const message = err.errors.map((item) => item.message).join(",");
  return new AppError(message, 400);
};

const sendError = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message;

  if (error.name === "SequelizeUniqueConstraintError")
    error = handleDBConstraintError(error);
  if (error.name === "SequelizeDatabaseError")
    error = handleDBDatabaseError(error);
  if (error.name === "SequelizeValidationError")
    error = handleDBValidationError(error);

  sendError(error, req, res);
};
