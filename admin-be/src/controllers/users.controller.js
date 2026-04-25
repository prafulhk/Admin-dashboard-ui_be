const usersService = require("../services/users.service");
const { getIO } = require("../socket/socket");

exports.getUsers = (req, res) => {
  const users = usersService.getUsers();
  res.json(users);
};

exports.addUser = (req, res) => {
  const user = usersService.addUser(req.body);
  getIO().emit("userAdded", user);
  res.json(user);
};

exports.deleteUser = (req, res) => {
  usersService.deleteUser(req.params.index);
  getIO().emit("userDeleted", req.params.index);
  res.json({ message: "User deleted" });
};
