const { Server } = require("socket.io");
const io = new Server(3000, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on("video-action", (data) => {
    socket.to(data.roomId).emit("video-action", data);
  });
});
