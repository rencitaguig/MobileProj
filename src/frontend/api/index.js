// Frontend API client for communicating with the backend

// Import API functions
import * as productApi from "../../api/products";
import * as userApi from "../../api/users";
import * as orderApi from "../../api/orders";

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
  getProducts: async (params) => {
    return await productApi.getProducts(params);
  },

  // Get product by ID
  /**
   * @param {string} id
   */
  getProductById: async (id) => {
    return await productApi.getProductById(id);
  },

  // Create a new product (admin only)
  /**
   * @param {Object} productData
   */
  createProduct: async (productData) => {
    return await productApi.createProduct(productData);
  },

  // Update a product (admin only)
  /**
   * @param {string} id
   * @param {Object} productData
   */
  updateProduct: async (id, productData) => {
    return await productApi.updateProduct(id, productData);
  },

  // Delete a product (admin only)
  /**
   * @param {string} id
   */
  deleteProduct: async (id) => {
    return await productApi.deleteProduct(id);
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
  register: async (userData) => {
    return await userApi.registerUser(userData);
  },

  // User login
  /**
   * @param {Object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   */
  login: async (credentials) => {
    return await userApi.loginUser(credentials);
  },

  // Get user profile
  /**
   * @param {string} userId
   */
  getProfile: async (userId) => {
    return await userApi.getUserProfile(userId);
  },

  // Update user profile
  /**
   * @param {string} userId
   * @param {Object} userData
   */
  updateProfile: async (userId, userData) => {
    return await userApi.updateUserProfile(userId, userData);
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
  createOrder: async (orderData) => {
    return await orderApi.createOrder(orderData);
  },

  // Get user orders
  /**
   * @param {string} userId
   */
  getUserOrders: async (userId) => {
    return await orderApi.getUserOrders(userId);
  },

  // Get order details
  /**
   * @param {string} orderId
   */
  getOrderDetails: async (orderId) => {
    return await orderApi.getOrderDetails(orderId);
  },

  // Update order status (admin only)
  /**
   * @param {string} orderId
   * @param {string} status
   */
  updateOrderStatus: async (orderId, status) => {
    return await orderApi.updateOrderStatus(orderId, status);
  },
};
