export const getFilteredProducts = (products, sortBy, searchQuery) => {
  let filtered = [...products];

  if (searchQuery) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  switch (sortBy) {
    case "popular":
      return filtered.sort((a, b) => b.rating - a.rating);
    case "newest":
      return filtered.sort((a, b) => b.id - a.id);
    case "price-low":
      return filtered.sort((a, b) => a.price - b.price);
    case "price-high":
      return filtered.sort((a, b) => b.price - a.price);
    default:
      return filtered;
  }
};

export const getCartProducts = (products, cart) =>
  products.filter((product) => cart.includes(product.id));

export const getOrderSummary = (cartProducts) => {
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
