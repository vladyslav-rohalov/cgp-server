const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      next(HttpError.MissingFields());
    } else if (error) {
      next(HttpError.Custom(error.message));
    } else {
      next();
    }
  };

  return func;
};

module.exports = validateBody;
