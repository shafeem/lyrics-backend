const express = require("express");
const verifyUser = require("../jwt/auth");

const {
  userlogin,
  verifyNumber,
  roleChanger,
} = require("../controller/usercontroller");

const router = express.Router();

router.post("/googleAuth", userlogin);
router.post("/verifynumber", verifyNumber);
router.post("/rolechanger", roleChanger);


module.exports = router;
