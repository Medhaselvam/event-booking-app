import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../services/eventService";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error(error);
        setError("We couldn't load this event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <p className="font-serif text-2xl text-[#252721]">
          Finding your event...
        </p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#faf8f3] px-6 py-20 text-center">
        <h1 className="font-serif text-4xl text-[#252721]">
          Event not found
        </h1>
        <p className="mt-4 text-[#6c6b62]">
          This event may no longer be available.
        </p>
        <Link
          to="/events"
          className="mt-6 inline-block rounded-full bg-[#c65338] px-6 py-3 font-semibold text-white"
        >
          Browse events
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-5 py-10 text-[#252721] sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <Link
          to="/events"
          className="text-sm font-semibold text-[#c65338] hover:underline"
        >
          ← All events
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Event introduction */}
          <section>
            <div className="relative flex min-h-64 items-end overflow-hidden rounded-[2rem] bg-[#d8a58e] p-8 sm:min-h-80 sm:p-12">
              <div className="absolute -right-10 -top-16 h-72 w-72 rounded-full border border-black/10" />
              <div className="absolute right-8 top-8 h-40 w-40 rounded-full border border-black/10" />

              <div className="relative">
                <span className="rounded-full bg-[#faf8f3]/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
                  {event.category}
                </span>

                <p className="mt-8 font-serif text-5xl font-medium leading-tight sm:text-6xl">
                  Make it
                  <br />
                  memorable.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c65338]">
                The event
              </p>

              <h1 className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-5xl">
                {event.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#6c6b62]">
                {event.description}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#e7e1d7] p-5">
                <p className="text-xs uppercase tracking-wider text-[#77766e]">
                  Date
                </p>
                <p className="mt-2 font-semibold">{event.date}</p>
              </div>

              <div className="rounded-2xl border border-[#e7e1d7] p-5">
                <p className="text-xs uppercase tracking-wider text-[#77766e]">
                  Time
                </p>
                <p className="mt-2 font-semibold">{event.time}</p>
              </div>

              <div className="rounded-2xl border border-[#e7e1d7] p-5">
                <p className="text-xs uppercase tracking-wider text-[#77766e]">
                  Location
                </p>
                <p className="mt-2 font-semibold">{event.location}</p>
              </div>

              <div className="rounded-2xl border border-[#e7e1d7] p-5">
                <p className="text-xs uppercase tracking-wider text-[#77766e]">
                  Availability
                </p>
                <p className="mt-2 font-semibold">
                  {event.seats > 0
                    ? `${event.seats} seats left`
                    : "Sold out"}
                </p>
              </div>
            </div>
          </section>

          {/* Booking panel */}
          <aside>
            <div className="sticky top-28 rounded-[1.5rem] bg-[#292d28] p-7 text-[#faf8f3] sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e9a58d]">
                Your next experience
              </p>

              <h2 className="mt-5 font-serif text-3xl">
                Save your spot.
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/65">
                Make a plan, bring a friend and enjoy the moment.
              </p>

              <div className="my-8 border-t border-white/15 pt-6">
                <p className="text-sm text-white/60">Tickets from</p>

                <p className="mt-1 font-serif text-4xl font-bold">
                  ₹{event.price}
                </p>

                <p className="mt-2 text-xs text-white/50">
                  Price per ticket
                </p>
              </div>

              {event.seats > 0 ? (
                <Link
                  to={`/book/${event._id}`}
                  className="block rounded-full bg-[#c65338] px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-[#a9432c]"
                >
                  Book your tickets ↗
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full cursor-not-allowed rounded-full bg-white/20 px-6 py-4 text-sm font-bold text-white/50"
                >
                  Sold out
                </button>
              )}

              <p className="mt-4 text-center text-xs text-white/45">
                Your next great memory starts here.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

export default EventDetails;