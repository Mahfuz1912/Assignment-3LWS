import Cart from "./Cart";
import ProductGrid from "./ProductGrid";
import SortSelect from "./SortSelect";

const MainContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Products</h2>
          <SortSelect />
        </div>
        <ProductGrid />
      </div>
      <Cart />
    </div>
  );
};

export default MainContent;
