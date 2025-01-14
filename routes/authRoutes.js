const express = require("express");
const { getMe, signup, login, logout } = require("../controller/authController");
const protectRoute = require("../middlewares/protectRoute");

const router = express.Router();

router.get("/getme", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
