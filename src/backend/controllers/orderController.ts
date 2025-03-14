import { orders } from "../models/Order";

/**
 * Get all orders
 * @returns {Array} All orders
 */
export const getAllOrders = () => {
  return orders;
};

/**
 * Get order by ID
 * @param {string} id - Order ID
 * @returns {Object|undefined} Order object or undefined
 */
export const getOrderById = (id) => {
  return orders.find((order) => order.id === id);
};

/**
 * Get orders by user ID
 * @param {string} userId - User ID
 * @returns {Array} Orders for the user
 */
export const getOrdersByUserId = (userId) => {
  return orders.filter((order) => order.userId === userId);
};

/**
 * Create a new order
 * @param {Object} orderData - Order data without id, createdAt, updatedAt
 * @returns {Object} New order
 */
export const createOrder = (orderData) => {
  const newOrder = {
    ...orderData,
    id: (orders.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  orders.push(newOrder);
  return newOrder;
};

/**
 * Update an order
 * @param {string} id - Order ID
 * @param {Object} orderData - Partial order data
 * @returns {Object|null} Updated order or null
 */
export const updateOrder = (id, orderData) => {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return null;

  orders[index] = {
    ...orders[index],
    ...orderData,
    updatedAt: new Date(),
  };

  return orders[index];
};

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {string} status - New status
 * @returns {Object|null} Updated order or null
 */
export const updateOrderStatus = (id, status) => {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return null;

  orders[index].status = status;
  orders[index].updatedAt = new Date();

  return orders[index];
};

/**
 * Delete an order
 * @param {string} id - Order ID
 * @returns {boolean} Success status
 */
export const deleteOrder = (id) => {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return false;

  orders.splice(index, 1);
  return true;
};
