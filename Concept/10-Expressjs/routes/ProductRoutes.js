const Router = require("express");
const router = Router();
const products = require("../utils/constants");

router.get("/api/products", (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);

  if (req.signedCookies.key && req.signedCookies.key === "JohnDoe") {
    return res.json(products);
  }

  return res.send({ msg: "Sorry. You need the correct cookie" });
});

module.exports = router;
