const fs = require("fs");
const readData = JSON.parse(fs.readFileSync("./temp/data.json"));
const products = readData.products;

// Create POST /products
exports.createProduct = (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
};

// Read GET /products
exports.getAllProduct = (req, res) => {
  res.status(200).json(products);
};

// Read GET /products/:id
exports.getProductByID = (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.status(200).json(product);
};

// UPDATE GET /products/:id
exports.productUpdate = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(202).json({ product: "Updated" });
};

// PATCH GET /products/:id
exports.productPatch = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(202).json({ product: "Updated" });
};

// DELETE GET /products/:id
exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.status(202).json({ product: "Product Deleted" });
};
