const express = require("express");

const {
  createBooking,
  getMyBookings,
  getAllBookings,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);

router.get("/my", protect, getMyBookings);

router.get("/", protect, admin, getAllBookings);

module.exports = router;