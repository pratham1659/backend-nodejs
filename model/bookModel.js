const mongoose = require("mongoose");
const { Schema } = mongoose;

//schemas for Books
const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, min: [0, "Invalid price input"], required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, min: [0, "Invalid rating input"], max: [5, "Invalid rating input"] },
  genres: [String],
});

//Model for Books
exports.Book = mongoose.model("Book", bookSchema);
