import { useEffect, useMemo, useState } from "react";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import products from "./data/products";
import heroImage from "./assets/Hero image.webp";

const categories = [
  "All",
  "Roses",
  "Tulips",
  "Sunflowers",
  "Mixed Bouquets",
  "Special Arrangements",
];

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(() => {
    const path = window.location.pathname;
    return path === "/cart" ? "cart" : path === "/checkout" ? "checkout" : "home";
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const selectedItems = cart.filter((item) => item.selected);
  const selectedTotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = (nextPage) => {
    const path = nextPage === "home" ? "/" : `/${nextPage}`;
    window.history.pushState({ page: nextPage }, "", path);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setPage(path === "/cart" ? "cart" : path === "/checkout" ? "checkout" : "home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const addToCart = (product) => {
    setOrderPlaced(false);
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1, selected: true }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
    );
  };

  const toggleItem = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAll = (selected) => {
    setCart((current) => current.map((item) => ({ ...item, selected })));
  };

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const formatPrice = (price) =>
    `₱ ${Number(price).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const goToCart = () => navigate("cart");

  return (
    <div className="min-h-screen bg-[#ffe8f1] text-[#393438]">
      {/* Custom storefront header: the existing components folder remains untouched. */}
      <header className="sticky top-0 z-40 border-b-2 border-[#9b8b92] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            onClick={() => navigate("home")}
            className="font-serif text-3xl font-black italic tracking-tight text-[#393438]"
            aria-label="Mayumi home"
          >
            mayumi
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#62575d] md:flex">
            <button onClick={() => navigate("home")} className="transition hover:text-[#a83f5b]">Home</button>
            <a href="#shop" onClick={() => page !== "home" && navigate("home")} className="transition hover:text-[#a83f5b]">Our Products</a>
            <a href="#about" className="transition hover:text-[#a83f5b]">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <label className="hidden w-48 items-center rounded-full border border-[#d9cbd1] bg-[#fff8fb] px-3 py-2 sm:flex lg:w-64">
              <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" />
              </svg>
              <input
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  if (page !== "home") navigate("home");
                }}
                placeholder="Search flowers..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b8b92]"
              />
            </label>
            <button
              onClick={goToCart}
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative rounded-full p-2 text-[#51464c] transition hover:bg-[#ffe8f1] hover:text-[#a83f5b]"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h2l2.4 11.5a2 2 0 0 0 2 1.5h8.8a2 2 0 0 0 1.9-1.4L22 7H6" />
                <circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#a83f5b] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {page === "home" && (
        <>
          <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pt-16">
            {/* Page 1: Mayumi introduction / hero */}
            <section className="relative isolate flex items-center overflow-visible rounded-[28px] border-2 border-[#9b8b92] bg-white px-7 py-8 sm:px-12 lg:px-16">
              <div className="relative z-10 max-w-[590px]">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#a83f5b]">Fresh flowers, heartfelt moments</p>
                <h1 className="font-serif text-7xl font-black italic leading-[0.95] tracking-[-0.06em] text-[#393438] sm:text-8xl lg:text-[112px]">
                  mayumi
                </h1>
                <h2 className="mt-6 font-sans text-xl font-bold text-[#a83f5b] sm:text-2xl">
                  Where Every Bloom Tells a Story.
                </h2>
                <p className="mt-5 max-w-[510px] font-[Arial] text-[13.5px] leading-[1] text-[#5d5559]">
                  Discover the beauty of fresh flowers with Mayumi, your trusted online flower shop in the Philippines. With flowers sourced from Dangwa, Manila, and other local growers, we offer a wide variety of fresh blooms and beautifully arranged bouquets for every occasion. From simple gestures to special celebrations, Mayumi makes every flower order special, easy, and meaningful.
                </p>
                <a
                  href="#shop"
                  className="mt-8 inline-flex rounded-full border-2 border-[#9b8b92] bg-[#ffe8f1] px-8 py-3 text-sm font-semibold text-[#51464c] transition hover:bg-[#a83f5b] hover:text-white"
                >
                  ORDER NOW!
                </a>
              </div>
              <div className="pointer-events-none absolute -right-8 bottom-0 top-0 hidden w-[49%] items-end justify-center lg:flex">
                <img
                  src={heroImage}
                  alt="A fresh arrangement of pink flowers"
                  className="h-[471px] w-[450px] object-contain object-bottom"
                />
                <span className="absolute right-[12%] top-[18%] -rotate-12 font-serif text-7xl text-[#f5a9c0]">♡</span>
              </div>
              <div className="pointer-events-none absolute -right-20 bottom-0 top-0 w-[55%] opacity-10 lg:hidden">
                <img src="https://images.unsplash.com/photo-1520763185298-1b434c919102?w=700&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
              </div>
            </section>

            {/* Page 2: product categories and flower cards */}
            <section id="shop" className="scroll-mt-24 pt-16 sm:pt-20">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#a83f5b]">Find your perfect bloom</p>
                  <h2 className="font-serif text-4xl font-bold italic sm:text-5xl">Our Products</h2>
                </div>
                <p className="text-sm text-[#796d73]">{filteredProducts.length} flowers and arrangements</p>
              </div>

              <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full border-2 px-4 py-2 font-serif text-sm italic transition ${
                      activeCategory === category
                        ? "border-[#a83f5b] bg-[#a83f5b] text-white"
                        : "border-[#a83f5b] bg-transparent text-[#a83f5b] hover:bg-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {filteredProducts.length ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {filteredProducts.map((product) => (
                    <article key={product.id} className="flex min-h-[455px] flex-col rounded-xl border-2 border-[#9b8b92] bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-lg bg-white p-3">
                        <span className="absolute left-2 top-2 z-10 rounded-full bg-[#a83f5b] px-3 py-1.5 font-serif text-xs italic text-white">
                          {product.category}
                        </span>
                        <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="flex flex-1 flex-col items-center px-2 pb-2 pt-3 text-center">
                        <h3 className="mt-2 min-h-[58px] font-serif text-2xl font-bold italic leading-tight text-[#393438]">
                          {product.name}
                        </h3>
                        <p className="mt-3 font-serif text-lg font-bold text-[#a83f5b]">{formatPrice(product.price)}</p>
                        <button
                          onClick={() => addToCart(product)}
                          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[#a83f5b] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#87334a]"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3h2l2.5 12h11L21 7H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
                          </svg>
                          Add to Cart
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border-2 border-[#9b8b92] bg-white py-16 text-center text-[#796d73]">No flowers found. Try another search or category.</p>
              )}
            </section>

            <section id="about" className="mt-16 rounded-2xl border-2 border-[#9b8b92] bg-white px-6 py-8 text-center sm:px-12">
              <h2 className="font-serif text-3xl font-bold italic">A little joy, delivered.</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#6d6268]">
                Thoughtfully selected blooms for birthdays, celebrations, anniversaries, and everyday moments.
              </p>
            </section>
          </main>
          <footer className="border-t-2 border-[#9b8b92] bg-white px-6 py-6 text-center text-sm text-[#796d73]">
            © {new Date().getFullYear()} Mayumi Flowers. Where every bloom tells a story.
          </footer>
        </>
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          onQuantityChange={updateQuantity}
          onToggleItem={toggleItem}
          onToggleAll={toggleAll}
          onRemove={removeItem}
          onContinueShopping={() => navigate("home")}
          onCheckout={() => navigate("checkout")}
          selectedTotal={selectedTotal}
          selectedCount={selectedItems.reduce((total, item) => total + item.quantity, 0)}
          formatPrice={formatPrice}
        />
      )}

      {page === "checkout" && (
        <Checkout
          items={selectedItems}
          total={selectedTotal}
          formatPrice={formatPrice}
          onBack={() => navigate("cart")}
          onPlaceOrder={() => {
            setOrderPlaced(true);
            setCart((current) => current.filter((item) => !item.selected));
          }}
          orderPlaced={orderPlaced}
        />
      )}
    </div>
  );
}

export default App;
