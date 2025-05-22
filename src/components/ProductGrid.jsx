// src/components/ProductGrid.jsx
import { useShop } from "../context/ShopContext";
import Product from "./Product";

const ProductGrid = () => {
  const { filteredProducts } = useShop();

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">No products found</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
