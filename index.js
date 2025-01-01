const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
const server = express();

//db connect

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/bookly_db");
  console.log("Database Connected!!");
}

// bodyParser - middleware
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("temp")); //path middleware to get the files
server.use("/books", bookRouter.routes);
server.use("/users", userRouter.routes);

// MVC Model-View-Controller

server.listen(8080, () => {
  console.log("Server Started");
});
