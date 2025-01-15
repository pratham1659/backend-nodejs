const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (res, req) => {
  res.send("Home Page");
});

app.post("/api/data", (req, res) => {
  res.json({
    message: "Data received",
    data: req.body,
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something Went Wrong");
});
