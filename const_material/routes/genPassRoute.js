const express = require("express");
const genPass = require("../controller/genPass");
const router = express.Router();

router.post('/genPass' , (req,res) => genPass(req,res));

module.exports = router;