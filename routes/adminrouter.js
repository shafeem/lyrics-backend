const express = require("express");

const { adminLogin } = require("../controller/admincontroller");

const router = express.Router();

router.post("/adminVerify", adminLogin);

module.exports = router;
