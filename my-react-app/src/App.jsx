import { useState } from "react";

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

import products from "./data/products";

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  // Search products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#ffe6f0]">

      {/* Header */}
      <Header
        cartCount={cart.length}
        onSearch={setSearchTerm}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Hero Section */}
        <section className="bg-white border-[2px] border-[#80727A] rounded-2xl p-10 md:p-16 mb-16">

          <p className="text-blue-600 font-semibold mb-3">
            WELCOME TO MYSTORE
          </p>

          <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">
            Find Products You'll Love.
          </h1>

          <p className="text-gray-500 mt-5 max-w-lg">
            Discover quality products at affordable prices.
            Your next favorite item is waiting for you.
          </p>

          <a
            href="#shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg mt-8 hover:bg-blue-600 transition"
          >
            Shop Now
          </a>

        </section>

        {/* Products */}
        <section id="shop">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Our Products
            </h2>

            <p className="text-gray-500 text-sm">
              {filteredProducts.length} Products
            </p>

          </div>

          {filteredProducts.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}

            </div>

          ) : (

            <p className="text-gray-500 text-center py-16">
              No products found.
            </p>

          )}

        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;

