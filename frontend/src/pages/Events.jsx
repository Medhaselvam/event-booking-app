import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/eventService";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
        setError("We couldn't load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    return (
      event.title?.toLowerCase().includes(searchText) ||
      event.category?.toLowerCase().includes(searchText) ||
      event.location?.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#252721]">

      <section className="border-b border-[#e7e1d7] px-5 py-14 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c65338]">
            Find your next thing
          </p>

          <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-serif text-5xl font-medium leading-tight sm:text-6xl">
                Get out there.
                <br />
                <span className="italic text-[#c65338]">
                  Something awaits.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#6c6b62]">
                Discover live events, meet people and make plans you will
                remember long after the day is over.
              </p>
            </div>

            <div className="w-full lg:max-w-sm">
              <label
                htmlFor="event-search"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#77766e]"
              >
                Find an event
              </label>

              <input
                id="event-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, category or city..."
                className="w-full rounded-xl border border-[#dcd5c9] bg-white px-5 py-4 text-sm outline-none transition placeholder:text-[#a09b91] focus:border-[#c65338] focus:ring-2 focus:ring-[#c65338]/10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-[#77766e]">
              {loading
                ? "Finding events..."
                : `${filteredEvents.length} ${
                    filteredEvents.length === 1 ? "event" : "events"
                  } to explore`}
            </p>

            <Link
              to="/"
              className="text-sm font-semibold text-[#c65338] hover:underline"
            >
              Back home ↗
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl">Finding good plans...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-[#f5e4df] p-6 text-[#a9432c]">
              {error}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#d6cec1] p-12 text-center">
              <h2 className="font-serif text-3xl">
                Nothing here just yet.
              </h2>

              <p className="mt-3 text-sm text-[#77766e]">
                Try another search or check back for new events.
              </p>

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-5 rounded-full bg-[#c65338] px-5 py-3 text-sm font-semibold text-white hover:bg-[#a9432c]"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event, index) => (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-2xl border border-[#e2dcd1] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`relative flex h-44 items-end overflow-hidden p-6 ${
                      index % 3 === 0
                        ? "bg-[#d8a58e]"
                        : index % 3 === 1
                        ? "bg-[#d7d8bd]"
                        : "bg-[#d6c9df]"
                    }`}
                  >
                    <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border border-black/10" />
                    <div className="absolute right-2 top-0 h-28 w-28 rounded-full border border-black/10" />

                    <span className="relative rounded-full bg-[#faf8f3]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]">
                      {event.category}
                    </span>

                    <span className="absolute right-5 top-4 font-serif text-4xl text-black/50">
                      ↗
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8a8176]">
                      {event.date}
                    </p>

                    <h2 className="mt-3 font-serif text-2xl font-bold leading-snug">
                      {event.title}
                    </h2>

                    <p className="mt-2 text-sm text-[#77766e]">
                      {event.location} · {event.time}
                    </p>

                    <p className="mt-5 line-clamp-2 min-h-10 text-sm leading-6 text-[#6c6b62]">
                      {event.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-[#e7e1d7] pt-5">
                      <div>
                        <p className="text-lg font-bold">₹{event.price}</p>
                        <p className="text-xs text-[#77766e]">per ticket</p>
                      </div>

                      <Link
                        to={`/events/${event._id}`}
                        className="rounded-full bg-[#252721] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#c65338]"
                      >
                        Explore event ↗
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-[#e7e1d7] px-5 py-7 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row">
          <p className="font-serif text-lg font-bold">eventbook.</p>
          <p className="text-xs text-[#77766e]">
            Make room for the moments that matter.
          </p>
        </div>
      </footer>

    </main>
  );
}

export default Events;