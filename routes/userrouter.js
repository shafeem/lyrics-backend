const express = require("express");
const verifyUser = require("../jwt/auth");

const {
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
  likedSongFinder,
  handleLikeSongs,
  favoriteSongs,
  addSongToPlaylist,
  findArtistSongs,
  songDetails,
  songEditer,
} = require("../controller/usercontroller");

const {tokenVerify} = require("../jwt/auth")

const router = express.Router();

router.get("/songFinder", songFinder);

router.post("/getPlaylists",tokenVerify, getPlaylists);
router.post("/googleAuth", userlogin);
router.post("/verifynumber", verifyNumber);
router.post("/rolechanger",tokenVerify, roleChanger);
router.post("/profileSubmit",tokenVerify, profileSubmit);
router.post("/dataCollector",tokenVerify, dataCollector);
router.post("/songSubmitter",tokenVerify, songSubmitter);
router.post("/createPlaylist",tokenVerify, createPlaylist);
router.post("/addPlaylistSong",tokenVerify, addPlaylistSong);
router.post("/playlistSubmitter",tokenVerify, playlistSubmitter);
router.post("/deletePlaylistSongs",tokenVerify, deletePlaylistSongs);
router.post("/deletePlaylist",tokenVerify, deletePlaylist);
router.post("/deleteSongs",tokenVerify, deleteSongs);
router.post("/searchFinder", searchFinder);
router.post("/likedSongFinder",tokenVerify, likedSongFinder);
router.post("/handleLikeSongs",tokenVerify, handleLikeSongs);
router.post("/favoriteSongs",tokenVerify, favoriteSongs);
router.post("/addSongToPlaylist",tokenVerify, addSongToPlaylist);
router.post("/findArtistSongs",tokenVerify, findArtistSongs);
router.post("/songDetails",tokenVerify, songDetails);
router.post("/songEditer",tokenVerify, songEditer);

module.exports = router;
