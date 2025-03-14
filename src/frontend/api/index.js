// Frontend API client for communicating with the backend

// Import backend services directly for now
// In a real app, these would be API calls to the backend server
import * as productService from "../../backend/services/productService";
import * as userService from "../../backend/services/userService";
import * as orderService from "../../backend/services/orderService";

// Product API
export const productApi = {
  // Get products with optional filtering
  /**
   * @param {Object} [params]
   * @param {string} [params.category]
   * @param {number} [params.minPrice]
   * @param {number} [params.maxPrice]
   * @param {string} [params.sortBy]
   */
  getProducts: (params) => {
    return productService.getProducts(params);
  },

  // Get product by ID
  /**
   * @param {string} id
   */
  getProductById: (id) => {
    return productService.getProductDetails(id);
  },

  // Create a new product (admin only)
  /**
   * @param {Object} productData
   */
  createProduct: (productData) => {
    return productService.createProduct(productData);
  },

  // Update a product (admin only)
  /**
   * @param {string} id
   * @param {Object} productData
   */
  updateProduct: (id, productData) => {
    return productService.updateProduct(id, productData);
  },

  // Delete a product (admin only)
  /**
   * @param {string} id
   */
  deleteProduct: (id) => {
    return productService.deleteProduct(id);
  },
};

// User API
export const userApi = {
  // Register a new user
  /**
   * @param {Object} userData
   * @param {string} userData.email
   * @param {string} userData.name
   * @param {string} userData.password
   * @param {string} [userData.avatar]
   */
  register: (userData) => {
    return userService.registerUser(userData);
  },

  // User login
  /**
   * @param {Object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   */
  login: (credentials) => {
    return userService.loginUser(credentials);
  },

  // Get user profile
  /**
   * @param {string} userId
   */
  getProfile: (userId) => {
    return userService.getUserProfile(userId);
  },

  // Update user profile
  /**
   * @param {string} userId
   * @param {Object} userData
   */
  updateProfile: (userId, userData) => {
    return userService.updateUserProfile(userId, userData);
  },
};

// Order API
export const orderApi = {
  // Create a new order
  /**
   * @param {Object} orderData
   * @param {string} orderData.userId
   * @param {Array<{productId: string, quantity: number}>} orderData.items
   * @param {Object} orderData.shippingAddress
   * @param {string} orderData.paymentMethod
   */
  createOrder: (orderData) => {
    return orderService.createOrder(orderData);
  },

  // Get user orders
  /**
   * @param {string} userId
   */
  getUserOrders: (userId) => {
    return orderService.getUserOrders(userId);
  },

  // Get order details
  /**
   * @param {string} orderId
   */
  getOrderDetails: (orderId) => {
    return orderService.getOrderDetails(orderId);
  },

  // Update order status (admin only)
  /**
   * @param {string} orderId
   * @param {string} status
   */
  updateOrderStatus: (orderId, status) => {
    return orderService.updateOrderStatus(orderId, status);
  },
};
