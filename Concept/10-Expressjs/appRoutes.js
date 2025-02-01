const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to Home Page");
});

const mockUsers = [
  { id: 1, username: "Pratham", place: "Bangalore" },
  { id: 2, username: "Harsh", place: "Ranchi" },
  { id: 3, username: "Sourav", place: "Kolkata" },
  { id: 4, username: "Riya", place: "Delhi" },
  { id: 5, username: "Ankit", place: "Mumbai" },
  { id: 6, username: "Priya", place: "Chennai" },
  { id: 7, username: "Aman", place: "Pune" },
  { id: 8, username: "Sneha", place: "Hyderabad" },
];

app.get("/api", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  // when filter and value are  undefined
  if (!filter && !value) return res.send(mockUsers);

  if (filter && value) return res.send(mockUsers.filter((user) => user[filter].includes(value)));

  return res.send(mockUsers);
});

app.get("/api/users", (req, res) => {
  res.json(mockUsers);
});

//get a single products
app.get("/api/users/:id", (req, res) => {
  console.log("req.params", req.params);
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId))
    return res.status(400).send({
      msg: "Bad Request. ID must be a valid number.",
    });

  if (mockUsers.length === 0) {
    console.log("mockUsers array is empty");
  }

  // Find user by ID
  const getUsers = mockUsers.find((user) => user.id === parsedId);

  // Handle user not found
  if (!getUsers) {
    return res.status(404).send({
      msg: "User not found.",
    });
  }

  // Return the found user
  return res.send(getUsers);
});

// post request body sent
app.post("/api", (req, res) => {
  console.log(req.body);
  return res.sendStatus(200);
});

// post request body
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

//put request body
app.put("/api/users/:id", (req, res) => {
  console.log(req.body);
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) {
    return res.sendStatus(404);
  }

  mockUsers[findUserIndex] = { id: parsedId, ...body };

  return res.sendStatus(200);
});

//patch request body
app.patch("/api/users/:id", (req, res) => {
  console.log(req.body);
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) {
    return res.sendStatus(404);
  }

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return res.sendStatus(200);
});

app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) {
    return res.sendStatus(404);
  }

  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
