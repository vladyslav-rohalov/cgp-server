const multer = require("multer");
const mime = require("mime-types");
const storage = multer.memoryStorage();
const HttpError = require("../helpers/HttpError");

const allowedImageFormats = ["jpg", "jpeg", "png"];
const MAX_FILE_SIZE = 5000000;

const fileFilter = async (req, file, cb) => {
  const fileTypeResult = mime.lookup(file.originalname);
  const fileSize = parseInt(req.headers["content-length"]);
  if (
    !fileTypeResult ||
    !allowedImageFormats.includes(fileTypeResult.split("/")[1].toLowerCase())
  ) {
    cb(HttpError.FileFormat(), false);
  }
  if (fileSize > MAX_FILE_SIZE) {
    cb(HttpError.FileSize(), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
});

module.exports = upload;
