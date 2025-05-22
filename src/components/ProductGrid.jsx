import { useShop } from "../context/useShop";
import Product from "./Product";

const ProductGrid = () => {
  const { filteredProducts } = useShop();

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12 bg-cyan-300">
        <p className="text-6xl font-bold text-red-500">No Products Found</p>
        <br />
        <p className="text-3xl font-semibold text-purple-400">Search Correct Title Name</p>
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
