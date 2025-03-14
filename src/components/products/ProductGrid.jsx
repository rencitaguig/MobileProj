import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { products } from "../../backend/models/Product";

/**
 * @typedef {Object} ProductGridProps
 * @property {string} [title]
 * @property {Array} [products]
 * @property {boolean} [showFilters]
 */

/**
 * @param {ProductGridProps} props
 */
const ProductGrid = ({
  title = "Products",
  products: initialProducts = products,
  showFilters = true,
}) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    let result = [...initialProducts];

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    // Apply sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      result.sort((a, b) => (a.isNew ? -1 : b.isNew ? 1 : 0));
    } else if (sortOption === "bestselling") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [initialProducts, selectedCategory, priceRange, sortOption]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {showFilters && (
        <FilterBar
          onCategoryChange={setSelectedCategory}
          onPriceRangeChange={setPriceRange}
          onSortChange={setSortOption}
          className="mb-6"
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            rating={product.rating}
            discount={product.discount}
            isNew={product.isNew}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
