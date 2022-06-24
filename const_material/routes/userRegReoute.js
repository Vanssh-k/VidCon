const express = require("express");
const userReg = require("../controller/userReg");

const router = express.Router();

router.post("/userReg", (req, res) => userReg(req, res));

module.exports = router;
