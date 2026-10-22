import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">
          Loading bookings...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">
            Manage Bookings
          </h1>

          <p className="text-red-600">{error}</p>

          <Link
            to="/admin"
            className="inline-block mt-6 text-blue-600 hover:underline"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Manage Bookings
        </h1>

        <p className="text-gray-600 mb-8">
          View all customer bookings in EventBook.
        </p>

        <div className="bg-white rounded-xl shadow-md p-5 mb-8">
          <p className="text-gray-600">
            Total bookings
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-1">
            {bookings.length}
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">
              No bookings found yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-5">

                  {/* Customer and Event Details */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      {booking.event?.title || "Event unavailable"}
                    </h2>

                    <p className="text-gray-600 mb-2">
                      👤 Customer: {booking.user?.name || "User unavailable"}
                    </p>

                    <p className="text-gray-600 mb-2">
                      ✉️ Email: {booking.user?.email || "Not available"}
                    </p>

                    <p className="text-gray-600 mb-2">
                      📅 Event date: {booking.event?.date || "Not available"}
                    </p>

                    <p className="text-gray-600 mb-2">
                      📍 Location: {booking.event?.location || "Not available"}
                    </p>

                    <p className="text-gray-600 mb-2">
                      🎫 Tickets: {booking.tickets}
                    </p>

                    <p className="text-sm text-gray-500 mt-3">
                      Booking ID: {booking._id}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Booked on:{" "}
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Price and Status */}
                  <div className="md:text-right">
                    <p className="text-2xl font-bold text-green-600 mb-3">
                      ₹{booking.totalPrice}
                    </p>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

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

export default AdminBookings;