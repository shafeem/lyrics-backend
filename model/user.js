const mongoose = require("mongoose");
const Role = require("./role");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: Number,
  },
  type: {
    type: String,
    default: Role.user,
  },
  profile: {
    type: Boolean,
    default: false,
  },
  dob: {
    type: String,
  },
  location: {
    type: String,
  },
  language: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  likedSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
