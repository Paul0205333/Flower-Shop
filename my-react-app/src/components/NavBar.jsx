
import { useState } from "react";
import SearchBar from "./SearchBar";

function Navbar({ cartCount = 0, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "#shop" },
    { name: "Collections", href: "#collections" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6">

        <div className="min-h-20 flex items-center justify-between gap-6">

          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold tracking-tight shrink-0"
          >
            MyStore<span className="text-blue-600">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-600 hover:text-blue-600 transition"
              >
                {link.name}
              </a>
            ))}

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="hidden md:block w-40 xl:w-56">
              <SearchBar onSearch={onSearch} />
            </div>

            {/* Account */}
            <button
              aria-label="Account"
              className="hidden sm:block text-gray-700 hover:text-blue-600"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>
            </button>

            {/* Shopping Cart */}
            <button
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative text-gray-700 hover:text-blue-600"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M3 3h2l2.5 12h11L21 7H6" />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>

              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-700"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Mobile Navigation Links */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-5 flex flex-col gap-5">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {link.name}
              </a>
            ))}

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
