import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem("token"));

      try {
        setUser(JSON.parse(localStorage.getItem("user")));
      } catch {
        setUser(null);
      }
    };

    syncAuth();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    navigate("/login");
  };

  const linkStyle =
    "text-sm font-medium text-[#464640] transition hover:text-[#c65338]";

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e1d7] bg-[#faf8f3]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">

        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c65338] text-lg font-bold text-white">
            e.
          </div>

          <div>
            <p className="font-serif text-2xl font-bold tracking-tight text-[#252721]">
              eventbook
            </p>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#77766e]">
              Make it memorable
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-6">
          <Link to="/" className={linkStyle}>
            Home
          </Link>

          <Link to="/events" className={linkStyle}>
            Explore
          </Link>

          {token && (
            <Link to="/my-bookings" className={linkStyle}>
              My Bookings
            </Link>
          )}

          {token && user?.role === "admin" && (
            <Link to="/admin" className={linkStyle}>
              Dashboard
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" className={linkStyle}>
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-[#c65338] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a9432c]"
              >
                Join EventBook
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-full border border-[#d9d1c6] px-4 py-2 text-sm font-semibold text-[#36382f] transition hover:border-[#c65338] hover:text-[#c65338]"
            >
              Log out
            </button>
          )}
        </div>

      </nav>
    </header>
  );
}

export default Navbar;