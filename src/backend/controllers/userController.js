import { users } from "../models/User";

/**
 * Get all users
 * @returns {Array} All users
 */
export const getAllUsers = () => {
  return users;
};

/**
 * Get user by ID
 * @param {string} id - User ID
 * @returns {Object|undefined} User object or undefined
 */
export const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Object|undefined} User object or undefined
 */
export const getUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

/**
 * Create a new user
 * @param {Object} userData - User data without id
 * @returns {Object} New user
 */
export const createUser = (userData) => {
  const newUser = {
    ...userData,
    id: (users.length + 1).toString(),
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);
  return newUser;
};

/**
 * Update a user
 * @param {string} id - User ID
 * @param {Object} userData - Partial user data
 * @returns {Object|null} Updated user or null
 */
export const updateUser = (id, userData) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;

  users[index] = {
    ...users[index],
    ...userData,
    updatedAt: new Date(),
  };

  return users[index];
};

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {boolean} Success status
 */
export const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
};
