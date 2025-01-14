const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser } = require("../controller/userController.js");

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);

module.exports = router;
