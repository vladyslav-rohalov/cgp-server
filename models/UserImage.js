const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserImageSchema = new Schema({
  image: String,
  created_at: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const UserImage = mongoose.model("UserImage", UserImageSchema);
module.exports = UserImage;
