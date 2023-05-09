const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  artists: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  images: {
    coverart: {
      type: String,
    },
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  url: {
    type: String,
  },
  language: {
    type: String,
  },
  genre: {
    type: String,
  },
  status:{
    type:String,
  }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
