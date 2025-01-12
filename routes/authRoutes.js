const express = require("express");
const { signup, login, logout } = require("../controller/authController");
// const { protectRoute } = require("../middleware/protectRoute");

const router = express.Router();

// router.get("/getme", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
