import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/eventService";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Could not load featured events:", error);
      }
    };

    fetchEvents();
  }, []);

  const featuredEvents = events.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#252721]">

      {/* Hero */}
      <section className="px-5 pb-14 pt-12 sm:pb-20 sm:pt-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e4d9ca] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#c65338]" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#69675e]">
                Good plans start here
              </span>
            </div>

            <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
              Life happens
              <br />
              <span className="italic text-[#c65338]">when you</span>
              <br />
              show up.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#6c6b62] sm:text-lg">
              Live music, creative workshops and unforgettable evenings.
              Find something worth stepping out for.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/events"
                className="rounded-full bg-[#c65338] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#a9432c]"
              >
                Explore events <span className="ml-2">↗</span>
              </Link>

              <Link
                to="/register"
                className="px-4 py-3 text-sm font-semibold text-[#42433b] transition hover:text-[#c65338]"
              >
                Become a member →
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#e7e1d7] pt-6">
              <div>
                <p className="font-serif text-2xl font-bold">
                  {events.length}+
                </p>
                <p className="mt-1 text-xs text-[#77766e]">
                  Events to explore
                </p>
              </div>

              <div className="border-l border-[#e7e1d7] pl-8">
                <p className="font-serif text-2xl font-bold">Your city</p>
                <p className="mt-1 text-xs text-[#77766e]">
                  Your next experience
                </p>
              </div>
            </div>
          </div>

          {/* Editorial visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-[#e7b69c] sm:-right-5 sm:-top-5" />

            <div className="relative overflow-hidden rounded-[2rem] bg-[#292d28] p-7 text-[#faf8f3] shadow-xl sm:p-10">
              <div className="absolute -right-20 top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -right-8 top-32 h-44 w-44 rounded-full border border-white/10" />
              <div className="absolute bottom-0 left-0 h-2 w-full bg-[#c65338]" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Your next story
                  </span>
                  <span className="text-2xl">✳</span>
                </div>

                <div className="mb-12 mt-16">
                  <p className="font-serif text-5xl leading-tight sm:text-6xl">
                    Less
                    <br />
                    scrolling.
                    <br />
                    <span className="italic text-[#e9a58d]">
                      More living.
                    </span>
                  </p>
                </div>

                <div className="flex items-end justify-between border-t border-white/20 pt-5">
                  <div>
                    <p className="text-sm font-semibold">
                      Make room for something new.
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      Discover it on EventBook
                    </p>
                  </div>

                  <Link
                    to="/events"
                    aria-label="Explore events"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9a58d] text-xl text-[#292d28] transition hover:bg-white"
                  >
                    ↗
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 -rotate-3 rounded-xl bg-[#e8d7b9] px-5 py-4 text-[#34362e] shadow-lg sm:-left-6">
              <p className="font-serif text-lg font-bold">Out of office.</p>
              <p className="text-xs">Into the moment.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Events */}
      <section className="bg-[#f0ede5] px-5 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c65338]">
                Handpicked for you
              </p>

              <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">
                Plans worth making.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-7 text-[#6c6b62]">
                A few good reasons to close your laptop and get out there.
              </p>
            </div>

            <Link
              to="/events"
              className="w-fit border-b border-[#c65338] pb-1 text-sm font-semibold text-[#a9432c]"
            >
              Browse all events ↗
            </Link>
          </div>

          {featuredEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#d6cec1] bg-[#faf8f3] p-10 text-center">
              <p className="font-serif text-2xl">
                Something good is coming.
              </p>
              <p className="mt-2 text-sm text-[#77766e]">
                New events will appear here as they are added.
              </p>
              <Link
                to="/events"
                className="mt-5 inline-block text-sm font-semibold text-[#c65338]"
              >
                Explore events →
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event, index) => (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-2xl border border-[#e2dcd1] bg-[#faf8f3] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`relative flex h-40 items-end overflow-hidden p-6 ${
                      index === 0
                        ? "bg-[#d8a58e]"
                        : index === 1
                        ? "bg-[#d7d8bd]"
                        : "bg-[#d6c9df]"
                    }`}
                  >
                    <div className="absolute -right-5 -top-10 h-36 w-36 rounded-full border border-black/10" />
                    <div className="absolute -right-1 -top-4 h-24 w-24 rounded-full border border-black/10" />

                    <span className="relative rounded-full bg-[#faf8f3]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#36372f]">
                      {event.category}
                    </span>

                    <span className="absolute right-5 top-5 font-serif text-4xl text-black/50">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8a8176]">
                      {event.date}
                    </p>

                    <h3 className="mt-3 font-serif text-2xl font-bold leading-snug">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#77766e]">
                      {event.location} · {event.time}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-[#e7e1d7] pt-5">
                      <p className="text-lg font-bold">
                        ₹{event.price}
                        <span className="ml-1 text-xs font-normal text-[#77766e]">
                          / ticket
                        </span>
                      </p>

                      <Link
                        to={`/events/${event._id}`}
                        className="rounded-full border border-[#d9d1c6] px-4 py-2 text-xs font-semibold transition group-hover:border-[#c65338] group-hover:bg-[#c65338] group-hover:text-white"
                      >
                        View event ↗
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-[#e7e1d7] pt-6 sm:flex-row sm:items-center">
          <p className="font-serif text-lg font-bold">eventbook.</p>

          <p className="text-xs text-[#77766e]">
            Made for the moments that matter.
          </p>

          <Link
            to="/events"
            className="text-sm font-semibold text-[#c65338]"
          >
            Find your next event ↗
          </Link>
        </div>
      </footer>

    </main>
  );
}

export default Home;