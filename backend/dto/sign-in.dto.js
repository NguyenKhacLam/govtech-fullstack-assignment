const yup = require("yup");

const signUpSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(12).required(),
});

module.exports = signUpSchema;
