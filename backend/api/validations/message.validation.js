const Joi = require("joi");

const schema = Joi.object({
  option: Joi.string().min(5).max(255).required(),
});

module.exports = schema;
