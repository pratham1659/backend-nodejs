const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const { deleteNotifications, deleteOneNotification, getNotifications } = require("../controller/notificationController");

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleteOneNotification);

module.exports = router;
