const mongoose = require("mongoose");

const connectUrl = "mongodb://127.0.0.1:27017/video_con";
// const connectUrl =
//   "mongodb+srv://Admin-vansh:V%40nshk%40p00r@cluster0.jb0li.mongodb.net/studentDB?retryWrites=true&w=majority";
try {
  mongoose.connect(connectUrl, { autoIndex: false });
  console.log("mongoose connected!");
} catch (err) {
  console.log(err);
}
