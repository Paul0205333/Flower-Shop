import Navbar from "./Navbar";

function Header({ cartCount = 0, onSearch }) {
  return (
    <header className="w-full border-b-2 border-[#80727A]">
      {/* Navigation Bar */}
      <Navbar
        cartCount={cartCount}
        onSearch={onSearch}
      />

    </header>
  );
}

export default Header;
