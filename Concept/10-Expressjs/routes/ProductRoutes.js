const Router = require("express");
const router = Router();
const products = require("../utils/constants");

router.get("/api/products", (req, res) => {
  res.json(products);
});

module.exports = router;
