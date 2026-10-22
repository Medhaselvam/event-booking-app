const Booking = require("../models/Booking");
const Event = require("../models/Event");

// Create a booking
const createBooking = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    if (!eventId || !tickets) {
      return res.status(400).json({
        message: "Event and number of tickets are required",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (tickets > event.seats) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    const totalPrice = event.price * tickets;

    const booking = await Booking.create({
      user: req.user.id,
      event: event._id,
      tickets,
      totalPrice,
    });

    event.seats -= tickets;
    await event.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("event", "title date time location price category");

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// Get logged-in user's bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("event", "title date time location price category")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// Get all bookings for admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate(
        "event",
        "title date time location price category"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all bookings",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
};