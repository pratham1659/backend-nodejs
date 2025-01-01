const model = require("../model/bookModel");
const mongoose = require("mongoose");
const Book = model.Book;

// Create POST /books
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);

    const doc = await book.save();
    console.log([{ err: null, doc }]);

    res.status(201).json({
      message: "Book created successfully",
      data: doc,
    });
  } catch (err) {
    console.error([{ err, doc: null }]);
    res.status(400).json({
      message: "Error creating the book",
      error: err,
    });
  }
};

// Read GET /books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books || books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found",
      });
    }

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
    console.error([{ err, doc: null }]);
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
    console.log(id);

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format. Please provide a valid ObjectId.",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the book.",
      error: err,
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
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: replacedBook,
    });
  } catch (err) {
    // Log the error for debugging
    console.error(err);

    // Return a generic error response
    res.status(500).json({
      success: false,
      message: "An error occurred while replacing the book.",
      error: err,
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
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } catch (err) {
    // Log the error for debugging
    console.error(err);

    // Return a generic error response
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the book.",
      error: err,
    });
  }
};

// DELETE /books/:id
exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the book ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format. Please provide a valid ObjectId.",
      });
    }

    // Use findOneAndDelete to delete the book by its _id
    const deletedBook = await Book.findOneAndDelete({ _id: id });

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
      data: deletedBook,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the book.",
      error: err.message || err,
    });
  }
};
