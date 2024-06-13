const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const upload = require("../middlewares/filesUploader");
const { validateBody, validateFile } = require("../decorators");
const userSchema = require("../schemas/user");

router.get("/", userController.getUsers);

router.post(
  "/",
  upload.single("avatar"),
  validateFile("avatar"),
  validateBody(userSchema),
  userController.createUser
);

module.exports = router;
