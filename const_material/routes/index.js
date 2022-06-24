const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = new express.Router();

router.get("/", (req, res) => res.redirect(`/${uuidv4()}`));

module.exports = router;
