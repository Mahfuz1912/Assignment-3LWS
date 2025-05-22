// src/components/Product.jsx
import  {useShop}  from "../context/useShop";

const Product = ({ product }) => {
  const { addToCart, removeFromCart } = useShop();

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= product.rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-1">
            <div className="flex">{renderStars()}</div>
            <span className="text-xs text-gray-500 ml-1">
              {product.rating}/5
            </span>
          </div>
          <span className="text-xs text-gray-700">
            ({product.stock} pcs left)
          </span>
        </div>
        <div className="flex items-center">
          <p className="font-bold">${product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-400 line-through ml-2">
              ${product.originalPrice}
            </p>
          )}
        </div>
        {product.inCart ? (
          <button
            onClick={() => removeFromCart(product.id)}
            className="w-full mt-2 bg-red-800 py-1 text-gray-100 rounded flex items-center justify-center"
          >
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={() => addToCart(product.id)}
            disabled={product.stock === 0}
            className={`w-full mt-2 bg-gray-800 py-1 text-gray-100 rounded flex items-center justify-center ${
              product.stock === 0
                ? "disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                : "active:translate-y-1 transition-all active:bg-gray-900"
            }`}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
