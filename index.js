const express = require("express");
const http = require("http");
const ejs = require("ejs");

const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server);

const Mongoose = require("./const_material/models/mongoose");

const chats = require("./ChatApp/socketConnections.js");
chats(io);

app.set("view engine", "ejs");
app.use(express.static("public"));

//To Use JSON Format
app.use(express.json());

// Routes

// Home Route
const indexRoute = require("./const_material/routes/index");
app.use(indexRoute);

// Room Route
const roomRoute = require("./const_material/routes/room");
app.use(roomRoute);

// User Registration Route
const userRegRoute = require("./const_material/routes/userRegReoute");
app.use(userRegRoute);

// User Login Route
const userLoginRoute = require("./const_material/routes/userLoginRoute");
app.use(userLoginRoute);

// gen Pass
const genPass = require("./const_material/routes/genPassRoute");
app.use(genPass);

// Listen Server
server.listen(process.env.PORT || "3000", () => {
  console.log("server started at port 3000");
});
