
var socket = io();

var myPeer = new Peer(undefined, {
  secure: true,
  host: "0.peerjs.com",
  port: "443",
});

// var name = prompt("Enter your name");

const form = document.getElementById("msg-form");
const input = document.getElementById("msg-input");

const videoGrid = document.getElementById("videoGrid");
const my_video = document.createElement("video");
my_video.muted = true;

const peers = {};

navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    window.localStream = stream;
    addVideoStream(my_video, stream);
    myPeer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-joined", (userId) => {
      console.log("new user joined!");
      connectToNewUser(userId, stream);
    });
  });

socket.on("user-disconnected", (data) => {

  // const parsedData = Flatted.parse(data);

  // console.log(parsedData);
 
  // parsedData.close();
  // if (peers[data.userId]) peers[data.userId].close();
  // console.log( peers[data.userId]);
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

  peers[userId] = call;

  // call.close();
  console.log(call, userId);
  // stringifiedCall = Flatted.stringify(call);
  // parsedCall = Flatted.parse(stringifiedCall);
  // // console.log(parsedCall);

  // parsedCall.close();
  
  // socket.emit("call", stringifiedCall, userId);

  socket.emit("call", );
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

socket.on("user-joined", (data) => {
  console.log("Hurrey!! " + data + " has joined the room!");
});


muteBtn = document.getElementById("mute-btn");
muteBtn.addEventListener("click", () => {
    localStream.getAudioTracks()[0].stop();
    localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;

    muteBtn.classList.toggle("Active");
    
})

videoOff = document.getElementById("videoOff-btn");
videoOff.addEventListener("click", () => {
    localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled

    videoOff.classList.toggle("Active");

})