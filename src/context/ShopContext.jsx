// src/context/ShopContext.js
import { createContext, useContext, useReducer } from "react";
import Img1 from "/public/assets/image 1.png";
import Img10_1 from "/public/assets/image 10-1.png";
import Img10_2 from "/public/assets/image 10-2.png";
import Img7_1 from "/public/assets/image 7-1.png";
import Img8_2 from "/public/assets/image 8-2.png";
import Img8 from "/public/assets/image 8.png";
import Img9_1 from "/public/assets/image 9-1.png";
import Img9_2 from "/public/assets/image 9-2.png";
import Img9 from "/public/assets/image 9.png";

const ShopContext = createContext();

const initialState = {
  products: [
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      price: 145,
      image: Img1,
      stock: 212,
      rating: 4,
      discount: 0,
      inCart: true,
      quantity: 1,
      size: "Large",
      color: "White",
    },
    {
      id: 2,
      name: "Polo with Tipping Details",
      price: 180,
      image: Img10_1,
      stock: 320,
      rating: 1,
      discount: 0,
      inCart: false,
      quantity: 0,
    },
    {
      id: 3,
      name: "Black Striped T-shirt",
      price: 120,
      originalPrice: 160,
      image: Img10_2,
      stock: 420,
      rating: 3,
      discount: 25,
      inCart: false,
      quantity: 0,
    },
    {
      id: 4,
      name: "Skinny Fit Jeans",
      price: 240,
      originalPrice: 260,
      image: Img7_1,
      stock: 20,
      rating: 4,
      discount: 8,
      inCart: true,
      quantity: 1,
      size: "Large",
      color: "Blue",
    },
    {
      id: 5,
      name: "Checkered Shirt",
      price: 180,
      image: Img8_2,
      stock: 20,
      rating: 4,
      discount: 0,
      inCart: true,
      quantity: 1,
      size: "Medium",
      color: "Red",
    },
    {
      id: 6,
      name: "Sleeve Striped T-shirt",
      price: 130,
      originalPrice: 160,
      image: Img8,
      stock: 20,
      rating: 4,
      discount: 19,
      inCart: false,
      quantity: 0,
    },
    {
      id: 7,
      name: "Vertical Striped Shirt",
      price: 212,
      originalPrice: 232,
      image: Img9_1,
      stock: 20,
      rating: 4,
      discount: 9,
      inCart: false,
      quantity: 0,
    },
    {
      id: 8,
      name: "Courage Graphic T-shirt",
      price: 145,
      image: Img9_2,
      stock: 20,
      rating: 4,
      discount: 0,
      inCart: false,
      quantity: 0,
    },
    {
      id: 9,
      name: "Loose Fit Bermuda Shorts",
      price: 80,
      image: Img9,
      stock: 10,
      rating: 4.5,
      discount: 0,
      inCart: false,
      quantity: 0,
    },
  ],
  sortBy: "popular",
  searchQuery: "",
  cart: [1, 4, 5],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                inCart: true,
                quantity: 1,
                stock: product.stock - 1,
              }
            : product
        ),
        cart: [...state.cart, action.payload.id],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                inCart: false,
                stock: product.stock + product.quantity,
                quantity: 0,
              }
            : product
        ),
        cart: state.cart.filter((id) => id !== action.payload.id),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id && product.stock > 0
            ? {
                ...product,
                quantity: product.quantity + 1,
                stock: product.stock - 1,
              }
            : product
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id && product.quantity > 1
            ? {
                ...product,
                quantity: product.quantity - 1,
                stock: product.stock + 1,
              }
            : product
        ),
      };

    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};

const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (productId) => {
    dispatch({ type: "ADD_TO_CART", payload: { id: productId } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: productId } });
  };

  const increaseQuantity = (productId) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id: productId } });
  };

  const decreaseQuantity = (productId) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id: productId } });
  };

  const setSortBy = (sortOption) => {
    dispatch({ type: "SET_SORT_BY", payload: sortOption });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  };

  const getFilteredProducts = () => {
    let filteredProducts = [...state.products];

    // Apply search filter
    if (state.searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Apply sort
    switch (state.sortBy) {
      case "popular":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Assuming newer products have higher IDs (for demo)
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filteredProducts;
  };

  const getCartProducts = () => {
    return state.products.filter((product) => state.cart.includes(product.id));
  };

  const getOrderSummary = () => {
    const cartProducts = getCartProducts();
    const subtotal = cartProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    return {
      subtotal,
      discount,
      deliveryFee,
      total,
    };
  };

  return (
    <ShopContext.Provider
      value={{
        products: state.products,
        filteredProducts: getFilteredProducts(),
        cartProducts: getCartProducts(),
        orderSummary: getOrderSummary(),
        sortBy: state.sortBy,
        searchQuery: state.searchQuery,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        setSortBy,
        setSearchQuery,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const useShop = () => {
  return useContext(ShopContext);
};

export { ShopProvider, useShop };
