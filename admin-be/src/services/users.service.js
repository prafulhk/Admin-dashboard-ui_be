let users = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Pending",
  },
  {
    name: "dsdfsdfsdfsdfsd Lee",
    email: "david@example.com",
    role: "User",
    status: "Active",
  },
];

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
