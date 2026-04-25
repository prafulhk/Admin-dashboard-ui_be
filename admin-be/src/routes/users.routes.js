const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const Activity = require("../models/Activity");
const { getIO } = require("../socket/socket.js");

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "user"),
  async (req, res) => {
    const users = await User.find();
    console.log("users", users);
    res.json(users);
  },
);

router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    await Activity.create({
      action: "User Created",
      user: user.name,
    });
    
    const io = getIO();
    if (io) {
      io.emit("userAdded", user);
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      
      await Activity.create({
        action: "User Edited",
        user: user.name,
      });
      
      const io = getIO();
      if (io) {
        io.emit("userUpdated", user);
      } 
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      await Activity.create({
        action: "User Deleted",
        user: req.user.name,
      });
      
      const io = getIO();
      if (io) {
        io.emit("userDeleted", req.params.id);
      }
      
      res.json({ message: "User deleted", userId: req.params.id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

module.exports = router;
