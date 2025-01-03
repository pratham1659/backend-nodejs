const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
const path = require("path");
const server = express();
require("dotenv").config();

//db connect

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookly_db");
    console.log("Database connected successfully!");
  } catch (err) {
    logger.error("Failed to connect to the database:", err.message || err);
    process.exit(1);
  }
}

main().catch((err) => {
  logger.error("Unexpected error occurred in the main function:", err.message || err);
  process.exit(1); // Exit the process with a failure code
});

// bodyParser - middleware
server.use(cors());
server.use(express.json());
// server.use(express.static("temp")); //path middleware to get the files
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/books", bookRouter.routes);
server.use("/users", userRouter.routes);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// Server
server.listen(8080, () => {
  console.log("Server Started");
});
