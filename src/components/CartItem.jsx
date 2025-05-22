import React from "react";
import { useShop } from "../context/useShop";

const CartItem = ({ product }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useShop();

  return (
    <div className="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{product.name}</h3>
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-red-500 text-sm"
          >
            ×
          </button>
        </div>
        <p className="text-sm text-gray-500">Size: {product.size}</p>
        <p className="text-sm text-gray-500">Color: {product.color}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">${product.price}</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => decreaseQuantity(product.id)}
              
              className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"
            >
              -
            </button>
            <span className="text-sm">{product.quantity}</span>
            <button
              onClick={() => increaseQuantity(product.id)}
              disabled={product.stock === 0}
              className={`w-6 h-6 bg-gray-100 rounded flex items-center justify-center ${
                product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
