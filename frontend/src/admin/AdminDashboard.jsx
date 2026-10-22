import { Link } from "react-router-dom";

function AdminDashboard() {
  const sections = [
    {
      number: "01",
      title: "Events",
      description:
        "Create new experiences and keep your event listings up to date.",
      links: [
        { label: "Add Event", to: "/admin/add-event", primary: true },
        { label: "Manage Events", to: "/admin/events", primary: false },
      ],
      accent: "bg-[#d8a58e]",
      symbol: "✳",
    },
    {
      number: "02",
      title: "Bookings",
      description:
        "Review customer reservations, ticket quantities and booking status.",
      links: [
        {
          label: "View Bookings",
          to: "/admin/bookings",
          primary: true,
        },
      ],
      accent: "bg-[#d7d8bd]",
      symbol: "↗",
    },
    {
      number: "03",
      title: "Users",
      description:
        "View registered accounts and distinguish administrators from users.",
      links: [
        { label: "Manage Users", to: "/admin/users", primary: true },
      ],
      accent: "bg-[#d6c9df]",
      symbol: "◎",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf8f3] px-5 py-12 text-[#252721] sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <section className="relative overflow-hidden rounded-[2rem] bg-[#292d28] p-8 text-[#faf8f3] sm:p-12 lg:p-14">
          <div className="absolute -right-16 -top-20 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute right-10 top-10 h-48 w-48 rounded-full border border-white/10" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e9a58d]">
              EventBook · Administration
            </p>

            <h1 className="mt-5 font-serif text-5xl font-medium leading-tight sm:text-6xl">
              Behind every
              <br />
              <span className="italic text-[#e9a58d]">
                good gathering.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
              Manage events, keep track of reservations and look after your
              EventBook community from one place.
            </p>

            <Link
              to="/events"
              className="mt-8 inline-block rounded-full bg-[#e9a58d] px-6 py-3.5 text-sm font-bold text-[#292d28] transition hover:bg-white"
            >
              View public website ↗
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c65338]">
              Your workspace
            </p>

            <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
              What would you like to manage?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <article
                key={section.number}
                className="overflow-hidden rounded-[1.5rem] border border-[#e7e1d7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`flex items-center justify-between p-6 ${section.accent}`}>
                  <span className="text-xs font-bold tracking-[0.18em]">
                    {section.number}
                  </span>

                  <span className="font-serif text-4xl">
                    {section.symbol}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-2xl font-bold">
                    {section.title}
                  </h3>

                  <p className="mt-3 min-h-14 text-sm leading-7 text-[#6c6b62]">
                    {section.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {section.links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={
                          link.primary
                            ? "rounded-full bg-[#c65338] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#a9432c]"
                            : "rounded-full border border-[#d9d1c6] px-4 py-3 text-xs font-bold transition hover:border-[#c65338] hover:text-[#c65338]"
                        }
                      >
                        {link.label} ↗
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-12 border-t border-[#e7e1d7] pt-6">
          <Link
            to="/"
            className="text-sm font-semibold text-[#c65338] hover:underline"
          >
            ← Back to EventBook home
          </Link>
        </footer>

      </div>
    </main>
  );
}

export default AdminDashboard;