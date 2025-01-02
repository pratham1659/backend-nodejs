const model = require("../model/bookModel");
const mongoose = require("mongoose");
const logger = require("../middlewares/logger");
const Book = model.Book;

// Create POST /books
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const doc = await book.save();

    logger.info(`GET /books - Book created successfully`);
    res.status(201).json({
      message: "Book created successfully",
      data: doc,
    });
  } catch (err) {
    logger.error(`Error in creating book: ${err.message}`, { error: err.message });
    res.status(400).json({
      message: "Error in creating book",
      error: err,
    });
  }
};

// Read GET /books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books || books.length === 0) {
      logger.warn(`No books found`);
      return res.status(404).json({
        success: false,
        message: "No books found",
      });
    }
    logger.info(`GET /books - Books fetched successfully`);

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
    logger.error(`Error fetching books: ${err.message}`, { error: err.message });
    res.status(400).json({
      success: false,
      message: "An error occurred while fetching books",
      error: err,
    });
  }
};

// Read GET /books/:id
exports.getBookByID = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn(`Invalid ID format: ${id}`);
      return res.status(400).json({
        success: false,
        message: "Invalid ID format. Please provide a valid ObjectId.",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      logger.warn(`Book not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }
    logger.info(`GET /books/${id} - Book fetched successfully`);
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    logger.error(`Error in finding book by ID: ${err.message}`, { error: err.message });
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the book.",
      error: err.message,
    });
  }
};

// Replace GET /books/:id
exports.replaceBook = async (req, res) => {
  try {
    const id = req.params.id;
    const replaceBookData = req.body;

    // Check if the book ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn(`Invalid ID format: ${id}`);
      return res.status(400).json({
        success: false,
        message: "Invalid ID format. Please provide a valid ObjectId.",
      });
    }

    const replacedBook = await Book.findOneAndReplace({ _id: id }, replaceBookData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the data before updating
    });

    if (!replacedBook) {
      logger.warn(`Book not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    logger.info(`PUT /books - Book replaced successfully`);

    res.status(200).json({
      success: true,
      data: replacedBook,
    });
  } catch (err) {
    // Log the error for debugging
    logger.error(`Error in replacing book: ${err.message}`, { error: err.message });

    // Return a generic error response
    res.status(500).json({
      success: false,
      message: "An error occurred while replacing the book.",
      error: err.message,
    });
  }
};

// Replace GET /books/:id
exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const updateBookData = req.body;

    // Check if the book ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn(`Invalid ID format: ${id}`);
      return res.status(400).json({
        success: false,
        message: "Invalid ID format. Please provide a valid ObjectId.",
      });
    }

    const updatedBook = await Book.findOneAndUpdate({ _id: id }, updateBookData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the data before updating
    });

    if (!updatedBook) {
      logger.warn(`Book not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }
    logger.info(`PATCH /books - Book patched successfully`);
    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } catch (err) {
    logger.error(`Error in patching book: ${err.message}`, { error: err.message });

    // Return a generic error response
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the book.",
      error: err.message,
    });
  }
};

// DELETE /books/:id
exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the book ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn(`Invalid ID format: ${id}`);
      return res.status(400).json({
        success: false,
        message: "Invalid ID format. Please provide a valid ObjectId.",
      });
    }

    // Use findOneAndDelete to delete the book by its _id
    const deletedBook = await Book.findOneAndDelete({ _id: id });

    if (!deletedBook) {
      logger.warn(`Book not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }
    logger.info(`DELETE /books - Book deleted successfully`);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
      data: deletedBook,
    });
  } catch (err) {
    logger.error(`Error in deleting book: ${err.message}`, { error: err.message });
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the book.",
      error: err.message,
    });
  }
};
