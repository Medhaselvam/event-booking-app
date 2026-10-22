import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    price: "",
    category: "",
    description: "",
    seats: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/events",
        {
          ...formData,
          price: Number(formData.price),
          seats: Number(formData.seats),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Event created successfully!");

      setTimeout(() => {
        navigate("/events");
      }, 1000);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Failed to create event"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold mb-6">
          Add New Event
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-5">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-medium mb-2">
              Event Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Date
            </label>

            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="October 30, 2026"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Time
            </label>

            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="6:00 PM"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Chennai"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="499"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Music"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Available Seats
            </label>

            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              placeholder="500"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Create Event
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddEvent;