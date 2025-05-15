const { Server } = require("socket.io");
const io = new Server(3000, {
  cors: {
    origin: "*",
  }
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
    if (rooms[roomId]) {
      socket.emit("video-state", rooms[roomId]);
    } else {
      rooms[roomId] = {
        url: "https://www.youtube.com/watch?v=xvFZjo5PgG0",
        time: 0,
        playing: false,
      };
    }
  });

  socket.on("video-action", (data) => {
    const { roomId, type, time, url } = data;

    if (!rooms[roomId]) {
      rooms[roomId] = {};
    }

    if (type === "play") {
      rooms[roomId].playing = true;
      rooms[roomId].time = time;
    } else if (type === "pause") {
      rooms[roomId].playing = false;
      rooms[roomId].time = time;
    } else if (type === "seek") {
      rooms[roomId].time = time;
    } else if (type === "change-url") {
      rooms[roomId].url = url;
      rooms[roomId].time = 0;
      rooms[roomId].playing = false;
    }

    socket.to(roomId).emit("video-action", data);
  });
});
