const mongoose = require("mongoose");

const callSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  call: {
    type : Object
  }
});

const call = new mongoose.model("Call", callSchema);

module.exports = call;