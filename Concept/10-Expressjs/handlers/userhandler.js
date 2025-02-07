const { matchedData, validationResult } = require("express-validator");
const { mockUsers } = require("../utils/constants");
const { hashPassword } = require("../utils/helper");
const User = require("../schemas/userSchema");

// 🟢 GET USER BY ID
const getUserByIdHandler = (request, response) => {
  const userId = parseInt(request.params.id);
  const findUser = mockUsers.find((user) => user.id === userId);

  if (!findUser) {
    return response.sendStatus(404);
  }

  return response.json(findUser);
};

// 🔵 CREATE USER
const createUserHandler = async (request, response) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response.status(400).json(result.array());
  }

  const data = matchedData(request);
  data.password = hashPassword(data.password);

  try {
    const newUser = new User(data);
    const savedUser = await newUser.save();

    return response.status(201).json(savedUser);
  } catch (err) {
    console.error("Create User Error:", err);
    return response.status(400).json({ error: err.message });
  }
};

module.exports = { getUserByIdHandler, createUserHandler };
