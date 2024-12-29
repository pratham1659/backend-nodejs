const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

const server = express();

// bodyParser - middleware
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("temp")); //path middleware to get the files
server.use("/products", productRouter.routes);
server.use("/users", userRouter.routes);

// MVC Model-View-Controller

server.listen(8080, () => {
  console.log("Server Started");
});
