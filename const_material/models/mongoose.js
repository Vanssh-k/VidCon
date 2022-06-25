const mongoose = require("mongoose");

// const connectUrl = "mongodb://127.0.0.1:27017/video_con";
const connectUrl =
  "mongodb+srv://Admin-vansh:<password>@cluster0.jb0li.mongodb.net/?retryWrites=true&w=majority";
try {
  mongoose.connect(connectUrl);
  console.log("mongoose connected!");
} catch (err) {
  console.log(err);
}
