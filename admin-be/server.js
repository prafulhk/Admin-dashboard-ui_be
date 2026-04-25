require("dotenv").config();
const app = require("./src/app.js");
const { initializeSocket } = require("./src/socket/socket.js");
const http = require("http");

const server = http.createServer(app);

initializeSocket(server);

const connectDB = require("./src/config/db.js");

const PORT = process.env.PORT || 3000;

// connect database
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
