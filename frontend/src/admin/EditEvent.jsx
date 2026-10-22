import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../services/eventService";
import api from "../services/api";

function EditEvent() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventById(id);

        setFormData({
          title: event.title || "",
          date: event.date || "",
          time: event.time || "",
          location: event.location || "",
          price: event.price ?? "",
          category: event.category || "",
          description: event.description || "",
          seats: event.seats ?? "",
        });
      } catch (error) {
        console.error(error);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

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
      setSaving(true);

      const token = localStorage.getItem("token");

      await api.put(
        `/events/${id}`,
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

      setSuccess("Event updated successfully!");

      setTimeout(() => {
        navigate("/admin/events");
      }, 1000);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Failed to update event"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading event...</p>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Event</h1>

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
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Time</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
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
              min="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? "Saving Changes..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;