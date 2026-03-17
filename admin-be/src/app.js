const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
