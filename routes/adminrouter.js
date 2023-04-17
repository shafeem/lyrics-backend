const express = require("express");

const { adminLogin,userFinder,artistApprover } = require("../controller/admincontroller");

const router = express.Router();

router.post("/adminVerify", adminLogin);
router.post("/userFinder",userFinder)
router.post("/artistApprover",artistApprover)

module.exports = router;
