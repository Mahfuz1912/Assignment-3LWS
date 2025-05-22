const shopReducer = (state, action) => {
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
export default shopReducer;
