
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim()) {
      onSearch?.(search.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full"
    >

      <input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-gray-100 rounded-full py-2.5 pl-4 pr-11 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <button
        type="submit"
        aria-label="Search products"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 4 4" />
        </svg>
      </button>

    </form>
  );
}

export default SearchBar;
