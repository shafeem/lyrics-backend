const express = require("express");

const {
  adminLogin,
  userFinder,
  artistApprover,
  songFinder,
  findArtist,
  findingUsers,
  songApprover,
  songRefuser,
} = require("../controller/admincontroller");

const {tokenVerify} = require("../jwt/auth")

const router = express.Router();

router.get("/songFinder",tokenVerify, songFinder);
router.get("/userFinder",tokenVerify, userFinder);
router.get("/findArtist",tokenVerify,findArtist)
router.get("/findingUsers",tokenVerify,findingUsers)



router.post("/adminVerify", adminLogin);
router.post("/artistApprover",tokenVerify, artistApprover);
router.post("/songRefuser",tokenVerify, songRefuser);
router.post("/songApprover",tokenVerify, songApprover);


module.exports = router;
