const HttpError = require("../helpers/HttpError");

const validateFile = () => {
  const func = (req, _, next) => {
    const file = req.file;
    if (!file) {
      return next(HttpError.MissingAatar());
    }
    next();
  };

  return func;
};

module.exports = validateFile;
