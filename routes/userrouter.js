const express = require("express");
const verifyUser = require("../jwt/auth");

const {
  userlogin,
  verifyNumber,
  roleChanger,
  profileSubmit,
  dataCollector,
} = require("../controller/usercontroller");

const router = express.Router();



router.post("/googleAuth", userlogin);
router.post("/verifynumber", verifyNumber);
router.post("/rolechanger", roleChanger);
router.post("/profileSubmit",profileSubmit)
router.post("/dataCollector",dataCollector)




module.exports = router;
