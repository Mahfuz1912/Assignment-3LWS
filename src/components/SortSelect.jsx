import { useShop } from "../context/useShop";

const SortSelect = () => {
  const { sortBy, setSortBy } = useShop();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-md px-2 py-1 text-sm"
      >
        <option value="popular">Most Popular</option>
        <option value="newest">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortSelect;
