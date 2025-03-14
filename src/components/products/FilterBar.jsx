import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, ArrowDownAZ, ArrowUpAZ, Check } from "lucide-react";

/**
 * @typedef {Object} FilterBarProps
 * @property {string[]} [categories]
 * @property {function(string): void} [onCategoryChange]
 * @property {function([number, number]): void} [onPriceRangeChange]
 * @property {function(string): void} [onSortChange]
 * @property {string} [className]
 */

/**
 * @param {FilterBarProps} props
 */
const FilterBar = ({
  categories = [
    "All",
    "Men",
    "Women",
    "Kids",
    "Accessories",
    "Footwear",
    "Outerwear",
  ],
  onCategoryChange = () => {},
  onPriceRangeChange = () => {},
  onSortChange = () => {},
  className = "",
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("featured");

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handlePriceChange = (value) => {
    const newRange = [value[0], value[1]];
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <div className={`w-full bg-white p-4 shadow-sm rounded-md ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          {/* Category Filter */}
          <div className="w-full sm:w-1/3">
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="w-full sm:w-1/3 flex flex-col">
            <span className="text-xs text-gray-500 mb-1">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </span>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              className="w-full"
            />
          </div>

          {/* Sort Options */}
          <div className="w-full sm:w-1/3">
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="bestselling">Best Selling</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedCategory("All");
            setPriceRange([0, 1000]);
            setSortOption("featured");
            onCategoryChange("All");
            onPriceRangeChange([0, 1000]);
            onSortChange("featured");
          }}
          className="whitespace-nowrap"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
