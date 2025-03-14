import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Grid, List, SlidersHorizontal } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
  isNew?: boolean;
  category: string;
}

interface ProductGridProps {
  title?: string;
  products?: Product[];
  showFilters?: boolean;
  initialView?: "grid" | "list";
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
}

const ProductGrid = ({
  title = "Featured Products",
  products = [
    {
      id: "1",
      name: "Classic Cotton T-Shirt",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      rating: 4.5,
      discount: 10,
      isNew: true,
      category: "Men",
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
      rating: 4.2,
      category: "Men",
    },
    {
      id: "3",
      name: "Summer Floral Dress",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400&q=80",
      rating: 4.7,
      isNew: true,
      category: "Women",
    },
    {
      id: "4",
      name: "Leather Jacket",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      rating: 4.8,
      discount: 15,
      category: "Outerwear",
    },
    {
      id: "5",
      name: "Running Shoes",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      rating: 4.4,
      category: "Footwear",
    },
    {
      id: "6",
      name: "Kids Denim Overalls",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80",
      rating: 4.3,
      discount: 5,
      category: "Kids",
    },
    {
      id: "7",
      name: "Leather Handbag",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
      rating: 4.6,
      category: "Accessories",
    },
    {
      id: "8",
      name: "Wool Beanie",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80",
      rating: 4.1,
      category: "Accessories",
    },
  ],
  showFilters = true,
  initialView = "grid",
  onProductClick = (id) => console.log(`Product clicked: ${id}`),
  onAddToCart = (id) => console.log(`Added to cart: ${id}`),
  onAddToWishlist = (id) => console.log(`Added to wishlist: ${id}`),
}: ProductGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [viewMode, setViewMode] = useState<"grid" | "list">(initialView);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique categories from products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, you would sort by date
        result.sort((a, b) => (a.isNew ? -1 : 1));
        break;
      case "bestselling":
        // In a real app, you would sort by sales count
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no specific sorting
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, sortOption]);

  return (
    <div className="w-full bg-gray-50">
      {/* Title and view toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>

        <div className="flex items-center gap-2">
          {/* Mobile filter toggle */}
          {showFilters && (
            <Button
              variant="outline"
              size="sm"
              className="sm:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          )}

          {/* View mode toggle */}
          <Tabs
            defaultValue={viewMode}
            className="w-[160px]"
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">
                <Grid className="h-4 w-4 mr-1" /> Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-1" /> List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Filter bar - desktop and mobile */}
      {showFilters && (
        <div
          className={`mb-6 ${showMobileFilters ? "block" : "hidden sm:block"}`}
        >
          <FilterBar
            categories={categories}
            onCategoryChange={setSelectedCategory}
            onPriceRangeChange={setPriceRange}
            onSortChange={setSortOption}
          />
        </div>
      )}

      {/* Products display */}
      {filteredProducts.length > 0 ? (
        <div
          className={`
          ${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "flex flex-col gap-4"
          }
        `}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={viewMode === "list" ? "w-full" : ""}
              onClick={() => onProductClick(product.id)}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                discount={product.discount}
                isNew={product.isNew}
                onAddToCart={() => onAddToCart(product.id)}
                onAddToWishlist={() => onAddToWishlist(product.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-md shadow-sm">
          <p className="text-lg text-gray-500 mb-4">
            No products found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("All");
              setPriceRange([0, 1000]);
              setSortOption("featured");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Load more button */}
      {filteredProducts.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="px-8">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
