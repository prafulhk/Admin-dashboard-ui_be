exports.getUsers = () => {
  return users;
};

exports.addUser = (user) => {
  users.push(user);
  return user;
};

exports.deleteUser = (index) => {
  users.splice(index, 1);
};
