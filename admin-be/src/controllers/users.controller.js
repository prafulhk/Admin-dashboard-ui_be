const usersService = require("../services/users.service");

exports.getUsers = (req, res) => {
  const users = usersService.getUsers();
  res.json(users);
};

exports.addUser = (req, res) => {
  const user = usersService.addUser(req.body);
  res.json(user);
};

exports.deleteUser = (req, res) => {
  usersService.deleteUser(req.params.index);
  res.json({ message: "User deleted" });
};
