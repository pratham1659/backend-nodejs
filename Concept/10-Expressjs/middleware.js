const express = require("express");
const app = express();

// Middleware
const myMiddleware = (req, res, next) => {
  console.log("This will run after every request");
  next();
};

//custome Middleware
const reqTimeStampLogger = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`${timeStamp} from ${req.method} to ${req.url}`);
  next();
};

app.use(reqTimeStampLogger);

// app.use(myMiddleware);

// Route Handlers
app.get("/", (req, res) => {
  res.status(200).send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

module.exports = loggingMiddleware;
