const jwt = require("jsonwebtoken");
const AppError = require("./../../utils/appError");

module.exports = function (req, res, next) {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return next(new AppError("Token is not valid", 401));
      } else {
        console.log(decoded);
        req.user = decoded;
        res.locals.user = decoded;
        next();
      }
    });
  } catch (err) {
    console.error("Something wrong with auth middleware");
    return next(new AppError("Server Error", 500));
  }
};
