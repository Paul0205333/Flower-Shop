
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Category Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        )}

      </div>

      {/* Product Information */}
      <div className="p-5">

        <h3 className="font-semibold text-gray-900 text-lg">
          {product.name}
        </h3>

        <p className="text-blue-600 font-bold text-xl mt-2">
          ₱{Number(product.price).toLocaleString("en-PH")}
        </p>

        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart?.(product)}
          className="w-full bg-black text-white py-3 rounded-lg mt-5 hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
