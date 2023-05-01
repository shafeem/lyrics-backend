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
  findArtistSongs
} = require("../controller/usercontroller");

const router = express.Router();

router.get("/songFinder" ,songFinder)


router.post("/getPlaylists",getPlaylists)
router.post("/googleAuth", userlogin);
router.post("/verifynumber", verifyNumber);
router.post("/rolechanger", roleChanger);
router.post("/profileSubmit",profileSubmit)
router.post("/dataCollector",dataCollector)
router.post("/songSubmitter",songSubmitter)
router.post("/createPlaylist",createPlaylist)
router.post("/addPlaylistSong",addPlaylistSong)
router.post("/playlistSubmitter",playlistSubmitter)
router.post("/deletePlaylistSongs",deletePlaylistSongs)
router.post("/deletePlaylist",deletePlaylist)
router.post("/deleteSongs",deleteSongs)
router.post("/searchFinder",searchFinder)
router.post("/likedSongFinder",likedSongFinder)
router.post("/handleLikeSongs",handleLikeSongs)
router.post("/favoriteSongs",favoriteSongs)
router.post("/addSongToPlaylist",addSongToPlaylist)
router.post("/findArtistSongs",findArtistSongs)




module.exports = router;
