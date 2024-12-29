const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

router
  .post("/", productController.createProduct)
  .get("/", productController.getAllProduct)
  .get("/:id", productController.getProductByID)
  .put("/:id", productController.productUpdate)
  .patch("/:id", productController.productPatch)
  .delete("/:id", productController.deleteProduct);

exports.routes = router;
