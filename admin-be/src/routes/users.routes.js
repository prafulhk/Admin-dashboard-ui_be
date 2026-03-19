const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

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
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(user);
  },
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  },
);

module.exports = router;
