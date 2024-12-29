const fs = require("fs");
const readHtml = fs.readFileSync("./temp/index.html", "utf-8");
const readData = JSON.parse(fs.readFileSync("./temp/data.json"));
const express = require("express");
const morgan = require("morgan");
const { type, hostname } = require("os");
const products = readData.products;

const server = express();

server.use(express.json());
server.use(morgan("default"));
server.use(express.static("temp")); //path middleware to get the files

// API - EndPoint - Route
// API ROOT , base URL, example -  google.com/api/v2/

// Create POST /products
server.post("/products", (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
});

// Read GET /products
server.get("/products", (req, res) => {
  res.status(200).json(products);
});

// Read GET /products/:id
server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.status(200).json(product);
});

// UPDATE GET /products/:id
server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(202).json({ product: "Updated" });
});

// PATCH GET /products/:id
server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(202).json({ product: "Updated" });
});

// DELETE GET /products/:id
server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.status(202).json({ product: "Product Deleted" });
});

server.listen(8080, () => {
  console.log("Server Started");
});
