/**
 * @typedef {Object} OrderItem
 * @property {string} productId
 * @property {number} quantity
 * @property {number} price
 */

/**
 * @typedef {('pending'|'processing'|'shipped'|'delivered'|'cancelled')} OrderStatus
 */

/**
 * @typedef {Object} ShippingAddress
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {string} country
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {OrderItem[]} items
 * @property {number} total
 * @property {OrderStatus} status
 * @property {ShippingAddress} shippingAddress
 * @property {string} paymentMethod
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]
 */

// Mock orders data
/** @type {Order[]} */
export const orders = [
  {
    id: "1",
    userId: "1",
    items: [
      { productId: "1", quantity: 2, price: 29.99 },
      { productId: "5", quantity: 1, price: 89.99 },
    ],
    total: 149.97,
    status: "delivered",
    shippingAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    paymentMethod: "credit_card",
  },
  {
    id: "2",
    userId: "2",
    items: [
      { productId: "3", quantity: 1, price: 49.99 },
      { productId: "7", quantity: 1, price: 79.99 },
    ],
    total: 129.98,
    status: "processing",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Somewhere",
      state: "NY",
      zipCode: "67890",
      country: "USA",
    },
    paymentMethod: "paypal",
  },
];
