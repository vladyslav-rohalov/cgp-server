const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  city: String,
  created_at: { type: Date, default: Date.now },
  images: [{ type: Schema.Types.ObjectId, ref: "UserImage" }],
  images_count: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

