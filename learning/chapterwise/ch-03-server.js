const fs = require("fs");
const readHtml = fs.readFileSync("./temp/index.html", "utf-8");
const readData = JSON.parse(fs.readFileSync("./temp/data.json"));
const express = require("express");
const morgan = require("morgan");
const { type, hostname } = require("os");

const server = express();

//bodyParser
server.use(express.json()); //json middleware for body

server.use(morgan("default"));

// server.use(express.urlencoded()) // url middleware for body

server.use(express.static("temp")); //path middleware to get the files

// server.use((req, res, next) => {
//   console.log(req.get("User-Agent"), req.method, req.ip, req.hostname);
//   next();
// });

const auth = (req, res, next) => {
  console.log(req.query);

  if (req.body.password == "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

// API - EndPoint - Route
server.get("/", auth, (req, res) => {
  // res.send("hello");
  // res.json(readData);
  // res.sendStatus(404);
  res.status(201).send("GET1");
});

server.get("/", (req, res) => {
  res.status(201).send("GET2");
});

server.post("/", (req, res) => {
  res.json({ type: "POST" });
});

server.put("/", (req, res) => {
  res.json({ type: "PUT" });
});

server.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

server.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
});

server.listen(8080, () => {
  console.log("Server Started");
});
