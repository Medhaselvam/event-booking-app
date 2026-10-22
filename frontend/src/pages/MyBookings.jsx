import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyBookings } from "../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message || "Unable to load your bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <p className="font-serif text-2xl">Finding your bookings...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-5 py-12 text-[#252721] sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c65338]">
              Your EventBook account
            </p>

            <h1 className="mt-3 font-serif text-5xl font-medium">
              Your plans.
            </h1>

            <p className="mt-3 text-sm leading-7 text-[#6c6b62]">
              Every ticket is a little something to look forward to.
            </p>
          </div>

          <Link
            to="/events"
            className="w-fit rounded-full bg-[#c65338] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#a9432c]"
          >
            Find another event ↗
          </Link>
        </div>

        <div className="mt-10 border-t border-[#e7e1d7] pt-6">
          <p className="text-sm text-[#77766e]">
            {bookings.length}{" "}
            {bookings.length === 1 ? "booking" : "bookings"} in your account
          </p>
        </div>

        {error ? (
          <div className="mt-6 rounded-xl bg-[#f5e4df] p-5 text-sm text-[#a9432c]">
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="mt-8 rounded-[1.5rem] border border-dashed border-[#d6cec1] px-6 py-16 text-center">
            <span className="text-4xl">✳</span>

            <h2 className="mt-5 font-serif text-3xl">
              Your next story starts here.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6c6b62]">
              You don't have any bookings yet. Explore events and find
              something worth getting excited about.
            </p>

            <Link
              to="/events"
              className="mt-6 inline-block rounded-full bg-[#c65338] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#a9432c]"
            >
              Explore events ↗
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {bookings.map((booking, index) => (
              <article
                key={booking._id}
                className="overflow-hidden rounded-[1.5rem] border border-[#e7e1d7] bg-white"
              >
                <div className="grid sm:grid-cols-[180px_1fr]">

                  <div
                    className={`flex min-h-36 items-center justify-center p-6 ${
                      index % 3 === 0
                        ? "bg-[#d8a58e]"
                        : index % 3 === 1
                        ? "bg-[#d7d8bd]"
                        : "bg-[#d6c9df]"
                    }`}
                  >
                    <span className="text-5xl">✳</span>
                  </div>

                  <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#c65338]">
                        {booking.event?.category || "Event"}
                      </p>

                      <h2 className="mt-2 font-serif text-2xl font-bold">
                        {booking.event?.title || "Event details unavailable"}
                      </h2>

                      <div className="mt-4 space-y-2 text-sm text-[#6c6b62]">
                        <p>
                          {booking.event?.date || "Date unavailable"}
                          {booking.event?.time
                            ? ` · ${booking.event.time}`
                            : ""}
                        </p>

                        <p>
                          {booking.event?.location || "Location unavailable"}
                        </p>

                        <p>
                          {booking.tickets}{" "}
                          {booking.tickets === 1 ? "ticket" : "tickets"}
                        </p>

                        <p>
                          Booked on{" "}
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString()
                            : "date unavailable"}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 sm:text-right">
                      <p className="font-serif text-3xl font-bold">
                        ₹{booking.totalPrice}
                      </p>

                      <span
                        className={`mt-3 inline-block rounded-full px-3 py-1.5 text-xs font-bold ${
                          booking.status === "Confirmed"
                            ? "bg-[#e5eadb] text-[#52633b]"
                            : "bg-[#f5e4df] text-[#a9432c]"
                        }`}
                      >
                        {booking.status}
                      </span>

                      <p className="mt-3 text-xs text-[#77766e]">
                        Ref: {booking._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            to="/events"
            className="text-sm font-semibold text-[#c65338] hover:underline"
          >
            ← Back to exploring
          </Link>
        </div>
      </div>
    </main>
  );
}

export default MyBookings;