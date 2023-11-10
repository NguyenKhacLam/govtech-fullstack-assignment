const yup = require("yup");

const signInSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(12).required(),
});

module.exports = signInSchema;
