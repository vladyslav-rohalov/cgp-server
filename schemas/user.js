const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(1).max(30).required().messages({
    "string.base": "NAME_ERR_STR",
    "string.min": "NAME_ERR_MIN",
    "string.max": "NAME_ERR_MAX",
    "any.required": "NAME_ERR_REQUIRED",
  }),
  city: Joi.string().min(1).max(30).required().messages({
    "string.base": "CITY_ERR_STR",
    "string.min": "CITY_ERR_MIN",
    "string.max": "CITY_ERR_MAX",
    "any.required": "CITY_ERR_REQUIRED",
  }),
});

module.exports = userSchema;
