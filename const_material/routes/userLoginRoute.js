const express = require("express");
const userLogin = require("../controller/userLogin");

const router = express.Router();

router.post("/userLogin", (req, res) => userLogin(req, res));

module.exports = router;
