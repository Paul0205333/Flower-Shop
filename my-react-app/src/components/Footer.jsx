
function Footer() {
  return (
    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Information */}
          <div>
            <h2 className="text-2xl font-bold">
              MyStore<span className="text-blue-500">.</span>
            </h2>

            <p className="text-gray-400 text-sm mt-4 leading-7">
              Discover quality products made for your everyday lifestyle.
              Shop with confidence and enjoy a better shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="#shop" className="hover:text-white">Shop</a></li>
              <li><a href="#collections" className="hover:text-white">Collections</a></li>
              <li><a href="#about" className="hover:text-white">About Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Customer Service
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="#shipping" className="hover:text-white">Shipping Information</a></li>
              <li><a href="#returns" className="hover:text-white">Returns & Refunds</a></li>
              <li><a href="#faq" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Get in Touch
            </h3>

            <p className="text-gray-400 text-sm leading-7">
              Have questions about your order?
            </p>

            <a
              href="mailto:support@mystore.com"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              support@mystore.com
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6">

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MyStore. All rights reserved.
            </p>

            <p className="text-gray-500 text-sm">
              Designed with React & Tailwind CSS.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
