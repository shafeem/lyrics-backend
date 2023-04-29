const userSchema = require("../model/user");
const Role = require("../model/role");
const jwt = require("jsonwebtoken");
const songSchema = require("../model/song");
const playlistSchema = require("../model/playlist");
const { default: mongoose } = require("mongoose");

require("dotenv").config();

const userlogin = async (req, res) => {
  try {
    let userId;
    let userType;
    let profile;

    const { name, email } = req.body.datas.data;

    const user = await userSchema.findOne({ email: email });

    if (user) {
      console.log("user already exist");

      userId = user._id;
      userType = user.type;
      profile = user.profile;
    } else {
      console.log("user not exist ");
      const newUser = new userSchema({
        name: name,
        email: email,
      });
      await newUser.save();

      const user = await userSchema.findOne({ email: email });
      userId = user._id;
      userType = user.type;
      profile = user.profile;
    }
    const token = jwt.sign({ userId }, process.env.JWT_SECREAT_KEY, {
      expiresIn: 86400,
    });

    res.json({
      auth: true,
      token: token,
      name: name,
      email: email,
      userId: userId,
      userType: userType,
      profile: profile,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const verifyNumber = async (req, res) => {
  console.log(req.body);
  const { number } = req.body;

  const user = await userSchema.findOne({ number: number });
  let userId;
  let userType;
  let profile;

  if (user) {
    console.log("existing user here");
    userId = user._id;
    userType = user.type;
    profile = user.profile;
  } else {
    console.log("user not existing here");
    const newUser = new userSchema({
      number: number,
    });
    await newUser.save();

    const user = await userSchema.findOne({ number: number });

    userId = user._id;
    userType = user.type;
    profile = user.profile;
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECREAT_KEY, {
    expiresIn: 86400,
  });

  res.json({
    auth: true,
    token: token,
    status: "success",
    userType: userType,
    userId: userId,
    profile: profile,
  });
};

const roleChanger = async (req, res) => {
  const { id } = req.body;
  console.log(id, "this is the id here");

  await userSchema
    .updateOne({ _id: id }, { $set: { type: "pending" } })
    .then(() => {
      console.log("role changed successfully ");
      res.json({
        // userType: Role.artist,
        userType: "pending",
      });
    });
};

const profileSubmit = async (req, res) => {
  try {
    const { name, email, dob, mobile, location, language, id, imgUrl } =
      req.body;
    console.log(req.body, "the body here");

    const user = await userSchema.findByIdAndUpdate(
      id,
      {
        name: name,
        email: email,
        number: mobile,
        profile: true,
        dob: dob,
        location: location,
        language: language,
        imgUrl: imgUrl,
      },
      {
        new: true,
      }
    );

    console.log(user, "the user here");
  } catch (error) {
    console.log(error, "Error");
  }
};

const dataCollector = async (req, res) => {
  const { userId } = req.body;

  const alldata = await userSchema.findOne({ _id: userId });

  console.log(alldata, "the all data");

  const songData = await songSchema.find({ artists: userId });
  console.log(songData, "the songData");

  res.json({ data: alldata, tracks: songData });
};

const songSubmitter = async (req, res) => {
  console.log(req.body, "the song body here ");
  const { songName, artistName, language, genre, songImg, songAudio, userId } =
    req.body;

  console.log(
    songName,
    artistName,
    language,
    genre,
    songImg,
    songAudio,
    userId,
    "all the details here"
  );

  const songUpload = new songSchema({
    artists: userId,
    images: {
      coverart: songImg,
    },
    title: songName,
    subtitle: artistName,
    url: songAudio,
    language: language,
    genre: genre,
  });

  await songUpload.save();
};

const songFinder = async (req, res) => {
  const songs = await songSchema.find();
  res.json({ tracks: songs });
};

const createPlaylist = async (req, res) => {
  const { userId } = req.body;

  const newPlaylist = new playlistSchema({
    owner: userId,
  });
  await newPlaylist.save();

  const playlistId = newPlaylist._id;
  res.json({ playlistId: playlistId });
};

const addPlaylistSong = async (req, res) => {
  const { playlistId, songId } = req.body;

  const playlist = await playlistSchema.findOne({ _id: playlistId });

  if (playlist?.songs?.includes(songId)) {
    console.log("already have the same song here");
  } else {
    playlist.songs.push(songId);
    try {
      await playlist.save();
      console.log(playlist, "the playlist here");
    } catch (error) {
      console.error(error);
    }
  }
};

const playlistSubmitter = async (req, res) => {
  const { playlistImg, playlistName, playId, userId } = req.body;
  console.log(req.body, "the datas here", playlistImg);

  const play = await playlistSchema
    .findOneAndUpdate(
      { _id: playId },
      {
        image: playlistImg,
        name: playlistName,
      },
      {
        new: true,
      }
    )
    .then(() => {
      res.json({ message: true });
      console.log("all settled here");
    });
};

const deletePlaylistSongs = async (req, res) => {
  const { songId, playlistId } = req.body;

  try {
    const playlist = await playlistSchema.findOne({ _id: playlistId });

    if (playlist && playlist.songs.includes(songId)) {
      const index = playlist.songs.indexOf(songId);
      playlist.songs.splice(index, 1);
      await playlist.save();
      console.log("Song deleted from playlist");
      const Playlists = await playlistSchema
        .findOne({ _id: playlistId })
        .populate("songs");
      const updatedPlaylist = Playlists.songs;
      res.json({ updatedPlaylist });
    } else {
      console.log("Song not found in playlist");
    }
  } catch (error) {
    console.error(error);
  }
};

const getPlaylists = async (req, res) => {
  console.log(req.body, "the body here");
  const { userId } = req.body;
  const datas = await playlistSchema.find({ owner: userId }).populate("songs");
  console.log(datas);
  res.json({ data: datas });
};

const deletePlaylist = async (req, res) => {
  console.log(req.body, "the body here");
  const { playlistId, userId } = req.body;
  const id = new mongoose.Types.ObjectId(playlistId);

  console.log("the play here", playlistId);
  const delPlaylist = await playlistSchema.deleteOne({ _id: playlistId });

  const datas = await playlistSchema.find({ owner: userId }).populate("songs");

  res.json({ datas: datas });
};

const deleteSongs = async (req, res) => {
  const { songId, userId } = req.body;

  const theSong = await songSchema.findOne({ _id: songId, artists: userId });

  if (theSong) {
    const deletingSong = await songSchema.deleteOne({
      _id: songId,
      artists: userId,
    });
    console.log(deletingSong, "song removed successfully");
  }
  const alldata = await userSchema.findOne({ _id: userId });

  console.log(alldata, "the all data");

  const songData = await songSchema.find({ artists: userId });
  console.log(songData, "the songData");

  res.json({ data: alldata, tracks: songData });
};

const searchFinder = async(req,res)=>{
  console.log(req.body,'the fucking body');
}

module.exports = {
  userlogin,
  verifyNumber,
  roleChanger,
  profileSubmit,
  dataCollector,
  songSubmitter,
  songFinder,
  createPlaylist,
  addPlaylistSong,
  playlistSubmitter,
  deletePlaylistSongs,
  getPlaylists,
  deletePlaylist,
  deleteSongs,
  searchFinder,
};
