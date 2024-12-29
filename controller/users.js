const fs = require("fs");
const readData = JSON.parse(fs.readFileSync("./temp/data.json"));
const users = readData.users;

// Create POST /users
exports.createUser = (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.status(201).json(req.body);
};

// Read GET /users
exports.getAllUser = (req, res) => {
  res.status(200).json(users);
};

// Read GET /users/:id
exports.getUserByID = (req, res) => {
  const id = +req.params.id;
  const User = users.find((p) => p.id === id);
  res.status(200).json(User);
};

// UPDATE GET /users/:id
exports.UserUpdate = (req, res) => {
  const id = +req.params.id;
  const UserIndex = users.findIndex((p) => p.id === id);
  users.splice(UserIndex, 1, { ...req.body, id: id });
  res.status(202).json({ User: "Updated" });
};

// PATCH GET /users/:id
exports.UserPatch = (req, res) => {
  const id = +req.params.id;
  const UserIndex = users.findIndex((p) => p.id === id);
  const User = users[UserIndex];
  users.splice(UserIndex, 1, { ...User, ...req.body });
  res.status(202).json({ User: "Updated" });
};

// DELETE GET /users/:id
exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const UserIndex = users.findIndex((p) => p.id === id);
  const User = users[UserIndex];
  users.splice(UserIndex, 1);
  res.status(202).json({ User: "Users Deleted" });
};
