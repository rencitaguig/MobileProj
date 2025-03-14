import * as productController from "../controllers/productController";

/**
 * Get all products with optional filtering
 * @param {Object} [options] - Filter options
 * @param {string} [options.category] - Category filter
 * @param {number} [options.minPrice] - Minimum price
 * @param {number} [options.maxPrice] - Maximum price
 * @param {string} [options.sortBy] - Sort option
 * @returns {Array} Filtered products
 */
export const getProducts = ({ category, minPrice, maxPrice, sortBy } = {}) => {
  let filteredProducts = [];

  // Apply category filter
  if (category && category !== "All") {
    filteredProducts = productController.getProductsByCategory(category);
  } else {
    filteredProducts = productController.getAllProducts();
  }

  // Apply price range filter
  if (minPrice !== undefined && maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );
  }

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filteredProducts.sort((a, b) => (a.isNew ? -1 : 1));
        break;
      case "bestselling":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no specific sorting
        break;
    }
  }

  return filteredProducts;
};

/**
 * Get product details by ID
 * @param {string} id - Product ID
 * @returns {Object|undefined} Product details
 */
export const getProductDetails = (id) => {
  return productController.getProductById(id);
};

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @returns {Object} New product
 */
export const createProduct = (productData) => {
  return productController.createProduct(productData);
};

/**
 * Update a product
 * @param {string} id - Product ID
 * @param {Object} productData - Product data to update
 * @returns {Object|null} Updated product or null
 */
export const updateProduct = (id, productData) => {
  return productController.updateProduct(id, productData);
};

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {boolean} Success status
 */
export const deleteProduct = (id) => {
  return productController.deleteProduct(id);
};
