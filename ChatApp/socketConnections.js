chat = (io) => {
  io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", userId);

      socket.on("send", (message) => {
        console.log(message);
        socket.to(roomId).emit("message", message);
      });

      socket.on("disconnect", () => {
        socket.to(roomId).emit("user-disconnected", userId);
      });
    });
  });
};

module.exports = chat;
