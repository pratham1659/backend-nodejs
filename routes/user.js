const express = require("express");
const router = express.Router();
const userController = require("../controller/users");

router
  .post("/", userController.createUser)
  .get("/", userController.getAllUser)
  .get("/:id", userController.getUserByID)
  .put("/:id", userController.UserUpdate)
  .patch("/:id", userController.UserPatch)
  .delete("/:id", userController.deleteUser);

exports.routes = router;
