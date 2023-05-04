const express = require("express");

const {
  adminLogin,
  userFinder,
  artistApprover,
  songFinder,
  findArtist,
  findingUsers
} = require("../controller/admincontroller");

const router = express.Router();

router.get("/songFinder", songFinder);
router.get("/userFinder", userFinder);
router.get("/findArtist",findArtist)
router.get("/findingUsers",findingUsers)


router.post("/adminVerify", adminLogin);
router.post("/artistApprover", artistApprover);


module.exports = router;
