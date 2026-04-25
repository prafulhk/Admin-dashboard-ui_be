const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket client connected:", socket.id);
    console.log("📊 Total connected clients:", io.engine.clientsCount);
    
    socket.on("disconnect", () => {
      console.log("❌ Socket client disconnected:", socket.id);
      console.log("📊 Total connected clients:", io.engine.clientsCount);
    });
  });
  
  console.log("🚀 Socket.IO server initialized");
};

const getIO = () => io;

module.exports = { initializeSocket, getIO };