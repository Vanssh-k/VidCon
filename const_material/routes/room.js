const express = require("express");

const router = express.Router();

router.get("/:room", (req, res) => {
  const roomID = req.params.room;
  const port = process.env.PORT;
  res.render("room", { roomID, port });
});

module.exports = router;
