const express = require("express");

const router = express.Router();

router.get("/:room", (req, res) => {
  const roomID = req.params.room;
  res.render("room", { roomID, port: process.env.PORT });
});

module.exports = router;
