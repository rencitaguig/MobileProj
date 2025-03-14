/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [avatar]
 * @property {boolean} [isAdmin]
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]
 */

// Mock users data
/** @type {User[]} */
export const users = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    isAdmin: false,
  },
  {
    id: "2",
    email: "jane@example.com",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    isAdmin: false,
  },
  {
    id: "3",
    email: "admin@example.com",
    name: "Admin User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    isAdmin: true,
  },
];
