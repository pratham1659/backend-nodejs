const Router = require("express");
const { query, validationResult, matchedData, checkSchema } = require("express-validator");
const { createUservalidationSchema, getUserValidationSchema } = require("../utils/validationSchemas");
const mockUsers = require("../utils/constants");
const { getUserByIdHandler, createUserHandler } = require("../handlers/userhandler");
const router = Router();

const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return res.status(400).send({
      msg: "Bad Request. ID must be a valid number.",
    });

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) {
    return res.status(404).send({
      msg: "User not found.",
    });
  }

  req.findUserIndex = findUserIndex;
  next();
};

router.get(
  "/api/users",
  [
    query("filter")
      .notEmpty()
      .withMessage("Must not be empty")
      .isString()
      .withMessage("Username must be string")
      .isLength({ min: 3, max: 10 })
      .withMessage("Must be at least 3-10 characters"),
  ],
  (req, res) => {
    console.log(req.query);
    console.log(req.session);
    console.log("SessionID:", req.session.id);
    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("Inside Session Store Get");
      console.log(sessionData);
    });
    const {
      query: { filter, value },
    } = req;

    if (!filter && !value) return res.send(mockUsers);

    if (filter && value) return res.send(mockUsers.filter((user) => user[filter].includes(value)));

    return res.send(mockUsers);
  }
);

router.get("/api/users/:id", resolveIndexByUserId, getUserByIdHandler);

router.post("/api/users", checkSchema(createUservalidationSchema), createUserHandler);

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  console.log(req.body);
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };

  return res.status(200).json({ msg: "Updated Successfully" });
});

router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return res.status(200).json({ msg: "Patched Successfully" });
});

router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  mockUsers.splice(findUserIndex, 1);
  return res.status(200).json({ msg: "Deleted Successfully" });
});

module.exports = router;
