const yup = require("yup");

const createPollSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  options: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
    })
  ),
});

module.exports = createPollSchema;
