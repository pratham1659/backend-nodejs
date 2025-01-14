const express = require("express");
const { createBook, getAllBooks, getBookByID, replaceBook, updateBook, deleteBook } = require("../controller/bookController");
const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookByID);
router.put("/:id", replaceBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
