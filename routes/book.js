const express = require("express");
const router = express.Router();
const bookController = require("../controller/books");

router
  .post("/", bookController.createBook)
  .get("/", bookController.getAllBooks)
  .get("/:id", bookController.getBookByID)
  .put("/:id", bookController.replaceBook)
  .patch("/:id", bookController.updateBook)
  .delete("/:id", bookController.deleteBook);

exports.routes = router;
