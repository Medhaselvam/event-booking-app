const Event = require("../models/Event");
const Booking = require("../models/Booking");

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

// Get single event
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

// Create event
const createEvent = async (req, res) => {
  try {
    
    const {
      title,
      date,
      time,
      location,
      price,
      category,
      description,
      seats,
    } = req.body;

    const event = await Event.create({
      title,
      date,
      time,
      location,
      price,
      category,
      description,
      seats,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create event",
      error: error.message,
    });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const {
      title,
      date,
      time,
      location,
      price,
      category,
      description,
      seats,
    } = req.body;

    event.title = title;
    event.date = date;
    event.time = time;
    event.location = location;
    event.price = price;
    event.category = category;
    event.description = description;
    event.seats = seats;

    const updatedEvent = await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update event",
      error: error.message,
    });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Keep event history intact if bookings already exist
    const existingBooking = await Booking.findOne({
      event: event._id,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Cannot delete an event that has existing bookings",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete event",
      error: error.message,
    });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};