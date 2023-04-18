const express = require("express");
const verifyUser = require("../jwt/auth");

const {
  userlogin,
  verifyNumber,
  roleChanger,
  profileSubmit,
  dataCollector,
  songSubmitter,
} = require("../controller/usercontroller");

const router = express.Router();



router.post("/googleAuth", userlogin);
router.post("/verifynumber", verifyNumber);
router.post("/rolechanger", roleChanger);
router.post("/profileSubmit",profileSubmit)
router.post("/dataCollector",dataCollector)
router.post("/songSubmitter",songSubmitter)




module.exports = router;
