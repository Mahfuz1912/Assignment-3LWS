import React, { useReducer } from "react";
import initialState from "./initialState";
import shopReducer from "./shopReducer";
import {
  getCartProducts,
  getFilteredProducts,
  getOrderSummary,
} from "./shopUtils";
import ShopContext from "./useShop";

const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const addToCart = (productId) =>
    dispatch({ type: "ADD_TO_CART", payload: { id: productId } });

  const removeFromCart = (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: productId } });

  const increaseQuantity = (productId) =>
    dispatch({ type: "INCREASE_QUANTITY", payload: { id: productId } });

  const decreaseQuantity = (productId) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: { id: productId } });

  const setSortBy = (sortOption) =>
    dispatch({ type: "SET_SORT_BY", payload: sortOption });

  const setSearchQuery = (query) =>
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });

  const filteredProducts = getFilteredProducts(
    state.products,
    state.sortBy,
    state.searchQuery
  );
  const cartProducts = getCartProducts(state.products, state.cart);
  const orderSummary = getOrderSummary(cartProducts);

  return (
    <ShopContext.Provider
      value={{
        products: state.products,
        filteredProducts,
        cartProducts,
        orderSummary,
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

export default ShopProvider;
