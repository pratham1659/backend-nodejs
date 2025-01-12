const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConfig");
const bookRouter = require("./routes/book");
const server = express();
const logger = require("./middlewares/logger");
require("dotenv").config();

//db connect
dbConnect().catch((err) => {
  logger.error("Unexpected error occurred in the main function:", err.message || err);
  process.exit(1); // Exit the process with a failure code
});

// bodyParser - middleware
server.use(cors());
server.use(express.json());
// server.use(express.static("temp")); //path middleware to get the files
server.use("/books", bookRouter.routes);

// Server
server.listen(8080, () => {
  console.log("Server Started");
});
