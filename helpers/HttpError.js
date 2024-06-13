class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static Custom(message) {
    return new HttpError(400, message);
  }

  static MissingFields() {
    return new HttpError(400, "MISSING_FIELDS_ADD_NAME_CITY_AVATAR");
  }

  static MissingAatar() {
    return new HttpError(400, "AVATAR_ERR_REQUIRED");
  }

  static Upload() {
    return new HttpError(400, "UPLOAD_ERROR");
  }

  static FileFormat() {
    return new HttpError(400, "INVALID_FILE_FORMAT");
  }

  static FileSize() {
    return new HttpError(400, "FILE_SIZE_EXCEEDED");
  }
}

module.exports = HttpError;
