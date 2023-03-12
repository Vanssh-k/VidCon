const callModel = require("../const_material/models/calls");
const {parse, stringify} = require('flatted');

// const replacerFunc = () => {
//   const visited = new WeakSet();
//   return (key, value) => {
//     if (typeof value === "object" && value !== null) {
//       if (visited.has(value)) {
//         return;
//       }
//       visited.add(value);
//     }
//     return value;
//   };
// };

chat = (io) => {
  io.on("connection", (socket) => {
    socket.on("join-room", async (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", userId);

      socket.on("send", (message) => {
        console.log(message);
        socket.to(roomId).emit("message", message);
      });


      socket.on("call", async (data) => {

        console.log("this", data.call);
        const call = new callModel({
          userId: userId,
          call : data
        })
        const callSaved = await call.save();
        if(callSaved){
          console.log("New user call saved!!");
        }
      })

      socket.on("disconnect",async () => {

        // const userCallData = await callModel.findOne({userId : userId})
        // console.log(userCallData);
        socket.to(roomId).emit("user-disconnected");
      });
    });
  });
};

module.exports = chat;
