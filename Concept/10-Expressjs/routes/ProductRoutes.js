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

router.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;

  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(item);
});

router.get("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  return res.send(req.session.cart ?? []);
});

module.exports = router;
