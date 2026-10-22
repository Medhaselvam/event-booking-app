import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/eventService";
import api from "../services/api";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message || "Failed to load events"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setActionMessage("");
    setActionError("");

    try {
      setDeletingId(event._id);

      const token = localStorage.getItem("token");

      await api.delete(`/events/${event._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents((currentEvents) =>
        currentEvents.filter((item) => item._id !== event._id)
      );

      setActionMessage("Event deleted successfully.");
    } catch (error) {
      console.error(error);

      setActionError(
        error.response?.data?.message || "Failed to delete event"
      );
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">
          Loading events...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-600">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Manage Events
            </h1>

            <p className="text-gray-600 mt-2">
              View and manage all EventBook events
            </p>
          </div>

          <Link
            to="/admin/add-event"
            className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            + Add Event
          </Link>
        </div>

        {/* Success and Error Messages */}
        {actionMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-5">
            {actionMessage}
          </div>
        )}

        {actionError && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">
            {actionError}
          </div>
        )}

        {/* Events List */}
        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">
              No events found.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  {/* Event Information */}
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-3">
                      {event.category}
                    </span>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h2>

                    <p className="text-gray-600 mb-2">
                      📅 {event.date}
                    </p>

                    <p className="text-gray-600 mb-2">
                      ⏰ {event.time}
                    </p>

                    <p className="text-gray-600 mb-2">
                      📍 {event.location}
                    </p>

                    <p className="text-gray-600">
                      🎫 Available seats: {event.seats}
                    </p>
                  </div>

                  {/* Price and Action Buttons */}
                  <div className="flex flex-col items-start md:items-end gap-4">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{event.price}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/admin/edit-event/${event._id}`}
                        className="inline-block bg-amber-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-amber-600"
                      >
                        Edit Event
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(event)}
                        disabled={deletingId === event._id}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
                      >
                        {deletingId === event._id
                          ? "Deleting..."
                          : "Delete Event"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link
            to="/admin"
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ManageEvents;