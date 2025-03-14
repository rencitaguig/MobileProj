import * as orderController from "../controllers/orderController";
import * as productController from "../controllers/productController";

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @param {string} orderData.userId - User ID
 * @param {Array<{productId: string, quantity: number}>} orderData.items - Order items
 * @param {Object} orderData.shippingAddress - Shipping address
 * @param {string} orderData.paymentMethod - Payment method
 * @returns {Object} New order
 */
export const createOrder = (orderData) => {
  // Calculate order total and create order items
  const orderItems = [];
  let total = 0;

  for (const item of orderData.items) {
    const product = productController.getProductById(item.productId);
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }

    // Calculate price (considering discounts)
    const price = product.discount
      ? product.price * (1 - product.discount / 100)
      : product.price;

    orderItems.push({
      productId: item.productId,
      quantity: item.quantity,
      price,
    });

    total += price * item.quantity;
  }

  // Create the order
  const newOrder = orderController.createOrder({
    userId: orderData.userId,
    items: orderItems,
    total,
    status: "pending",
    shippingAddress: orderData.shippingAddress,
    paymentMethod: orderData.paymentMethod,
  });

  return newOrder;
};

/**
 * Get user orders
 * @param {string} userId - User ID
 * @returns {Array} User orders
 */
export const getUserOrders = (userId) => {
  return orderController.getOrdersByUserId(userId);
};

/**
 * Get order details
 * @param {string} orderId - Order ID
 * @returns {Object} Order details
 */
export const getOrderDetails = (orderId) => {
  const order = orderController.getOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} status - New status
 * @returns {Object} Updated order
 */
export const updateOrderStatus = (orderId, status) => {
  const updatedOrder = orderController.updateOrderStatus(orderId, status);
  if (!updatedOrder) {
    throw new Error("Order not found");
  }

  return updatedOrder;
};
