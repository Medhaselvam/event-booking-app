import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../services/eventService";
import { createBooking } from "../services/bookingService";

function Booking() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error(error);
        setLoadError("Unable to load this event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setActionError("");

    if (!event || event.seats < 1) {
      setActionError("Sorry, no seats are available.");
      return;
    }

    if (
      !Number.isInteger(tickets) ||
      tickets < 1 ||
      tickets > Math.min(10, event.seats)
    ) {
      setActionError(
        `Choose between 1 and ${Math.min(10, event.seats)} tickets.`
      );
      return;
    }

    try {
      setBookingLoading(true);

      await createBooking(event._id, tickets);

      setShowPopup(true);
    } catch (error) {
      console.error(error);
      setActionError(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <p className="font-serif text-2xl">Preparing your booking...</p>
      </div>
    );
  }

  if (loadError || !event) {
    return (
      <div className="min-h-screen bg-[#faf8f3] p-10 text-center">
        <h1 className="font-serif text-3xl">
          We couldn't open this event.
        </h1>
        <p className="mt-3 text-[#c65338]">{loadError}</p>
        <Link to="/events" className="mt-6 inline-block text-[#c65338]">
          ← Browse events
        </Link>
      </div>
    );
  }

  const totalPrice = event.price * tickets;
  const maxTickets = Math.min(10, event.seats);

  return (
    <main className="min-h-screen bg-[#faf8f3] px-5 py-10 text-[#252721] sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <Link
          to={`/events/${event._id}`}
          className="text-sm font-semibold text-[#c65338] hover:underline"
        >
          ← Back to event
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.85fr]">

          <section>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c65338]">
              One step away
            </p>

            <h1 className="mt-3 font-serif text-5xl font-medium leading-tight">
              Make it
              <br />
              <span className="italic text-[#c65338]">
                official.
              </span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-[#6c6b62]">
              Choose your tickets and get ready for a moment worth remembering.
            </p>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-[#e7e1d7] bg-white">
              <div className="bg-[#d8a58e] p-7 sm:p-9">
                <span className="rounded-full bg-[#faf8f3]/90 px-3 py-2 text-xs font-bold uppercase tracking-wider">
                  {event.category}
                </span>
                <h2 className="mt-8 font-serif text-3xl font-bold sm:text-4xl">
                  {event.title}
                </h2>
              </div>

              <div className="space-y-4 p-6 sm:p-8">
                <p className="text-sm text-[#6c6b62]">
                  <span className="mr-2">📅</span>
                  {event.date} · {event.time}
                </p>

                <p className="text-sm text-[#6c6b62]">
                  <span className="mr-2">📍</span>
                  {event.location}
                </p>

                <p className="text-sm text-[#6c6b62]">
                  <span className="mr-2">🎫</span>
                  {event.seats} seats currently available
                </p>

                <p className="border-t border-[#e7e1d7] pt-4 text-sm leading-7 text-[#6c6b62]">
                  {event.description}
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="rounded-[1.5rem] border border-[#e7e1d7] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-serif text-3xl font-bold">
                Your tickets
              </h2>

              <p className="mt-2 text-sm text-[#77766e]">
                Review your selection before confirming.
              </p>

              {actionError && (
                <div className="mt-6 rounded-xl bg-[#f5e4df] p-4 text-sm text-[#a9432c]">
                  {actionError}
                </div>
              )}

              <form onSubmit={handleBooking} className="mt-8">
                <label
                  htmlFor="tickets"
                  className="mb-3 block text-sm font-semibold"
                >
                  Number of tickets
                </label>

                <div className="flex items-center gap-3">
                  <input
                    id="tickets"
                    type="number"
                    min="1"
                    max={maxTickets}
                    value={tickets}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setTickets(value);
                    }}
                    disabled={event.seats < 1}
                    className="w-full rounded-xl border border-[#dcd5c9] bg-[#faf8f3] px-4 py-4 outline-none focus:border-[#c65338] focus:ring-2 focus:ring-[#c65338]/10"
                    required
                  />

                  <span className="whitespace-nowrap text-xs text-[#77766e]">
                    Max. 10
                  </span>
                </div>

                <div className="my-8 rounded-xl bg-[#f3f0e8] p-5">
                  <div className="flex justify-between text-sm text-[#6c6b62]">
                    <span>Price per ticket</span>
                    <span>₹{event.price}</span>
                  </div>

                  <div className="mt-4 flex justify-between text-sm text-[#6c6b62]">
                    <span>Tickets selected</span>
                    <span>{tickets || 0}</span>
                  </div>

                  <div className="mt-5 flex items-end justify-between border-t border-[#ddd5c9] pt-5">
                    <span className="font-semibold">Total</span>
                    <span className="font-serif text-3xl font-bold">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading || event.seats < 1}
                  className="w-full rounded-full bg-[#c65338] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#a9432c] disabled:cursor-not-allowed disabled:bg-[#b6aea3]"
                >
                  {event.seats < 1
                    ? "Sold out"
                    : bookingLoading
                    ? "Confirming your booking..."
                    : "Confirm booking ↗"}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#77766e]">
                  Available seats are checked again by the server when you book.
                </p>
              </form>
            </div>
          </section>

        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20221e]/70 px-5 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            className="w-full max-w-md rounded-[1.5rem] bg-[#faf8f3] p-8 text-center shadow-2xl sm:p-10"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6d7b9] text-3xl">
              ✓
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#c65338]">
              It's happening
            </p>

            <h2
              id="booking-success-title"
              className="mt-3 font-serif text-4xl font-medium"
            >
              You're booked!
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6c6b62]">
              Your booking for {event.title} has been saved successfully.
            </p>

            <div className="my-6 rounded-xl bg-[#f0ede5] p-5">
              <p className="text-sm text-[#6c6b62]">
                {tickets} {tickets === 1 ? "ticket" : "tickets"}
              </p>
              <p className="mt-1 font-serif text-3xl font-bold">
                ₹{totalPrice}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/my-bookings"
                className="rounded-full bg-[#c65338] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#a9432c]"
              >
                View my bookings
              </Link>

              <Link
                to="/events"
                className="rounded-full border border-[#d9d1c6] px-6 py-3.5 text-sm font-semibold hover:border-[#c65338]"
              >
                Explore more events
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Booking;