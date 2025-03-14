import { products } from "../models/Product";

/**
 * Get all products
 * @returns {Array} All products
 */
export const getAllProducts = () => {
  return products;
};

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Object|undefined} Product object or undefined
 */
export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

/**
 * Get products by category
 * @param {string} category - Category name
 * @returns {Array} Filtered products
 */
export const getProductsByCategory = (category) => {
  if (category === "All") {
    return products;
  }
  return products.filter((product) => product.category === category);
};

/**
 * Get products by price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Array} Filtered products
 */
export const getProductsByPriceRange = (minPrice, maxPrice) => {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice,
  );
};

/**
 * Create a new product
 * @param {Object} productData - Product data without id
 * @returns {Object} New product
 */
export const createProduct = (productData) => {
  const newProduct = {
    ...productData,
    id: (products.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  products.push(newProduct);
  return newProduct;
};

/**
 * Update a product
 * @param {string} id - Product ID
 * @param {Object} productData - Partial product data
 * @returns {Object|null} Updated product or null
 */
export const updateProduct = (id, productData) => {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...productData,
    updatedAt: new Date(),
  };

  return products[index];
};

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {boolean} Success status
 */
export const deleteProduct = (id) => {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  return true;
};
