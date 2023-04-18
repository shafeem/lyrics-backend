const express = require("express");

const { adminLogin,userFinder,artistApprover,songFinder, } = require("../controller/admincontroller");

const router = express.Router();

router.get("/songFinder",songFinder)

router.post("/adminVerify", adminLogin);
router.post("/userFinder",userFinder)
router.post("/artistApprover",artistApprover)

module.exports = router;
