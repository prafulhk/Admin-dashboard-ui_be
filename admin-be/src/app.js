const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/authRoutes");
const ActivityRoutes = require("./routes/activityRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/getActivities", ActivityRoutes);

module.exports = app;
