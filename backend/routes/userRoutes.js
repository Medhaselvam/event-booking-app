const express = require("express");

const { getAllUsers } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", protect, admin, getAllUsers);

module.exports = router;