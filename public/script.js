var socket = io("http://localhost:3001", { transports: ["websocket"] });

var myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

var name = prompt("Enter your name");

const form = document.getElementById("msg-form");
const input = document.getElementById("msg-input");

const videoGrid = document.getElementById("video-grid");
const my_video = document.createElement("video");
my_video.muted = true;

const peers = {};

navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    addVideoStream(my_video, stream);
    myPeer.on('call', call => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    })

    socket.on("user-joined", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

socket.on("user-disconnected", (userId) => {
  if (peers[userId]) peers[userId].close();
});

function connectToNewUser(userId, stream) {
  var call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", function (remoteStream) {
    addVideoStream(video, remoteStream);
  });
  call.on("close", () => {
    video.remove();
  });
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

myPeer.on("open", (id) => {
  socket.emit("join-room", RoomId, id);
});

form.addEventListener("submit", (e) => {
  e.preventDefault;
  var message = input.value;
  input.value = "";
  socket.emit("send", message);
});

socket.on("user-joined", (data) => {
  console.log("Hurrey!! " + data + " has joined the room!");
});

socket.on("message", (message) => {
  console.log(message);
});
