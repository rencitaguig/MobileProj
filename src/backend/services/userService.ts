import * as userController from "../controllers/userController";

/**
 * User registration
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.name - User name
 * @param {string} userData.password - User password (would be hashed in a real app)
 * @param {string} [userData.avatar] - User avatar URL
 * @returns {Object} New user data
 */
export const registerUser = (userData) => {
  // Check if user already exists
  const existingUser = userController.getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Create new user (password would be hashed in a real app)
  const newUser = userController.createUser({
    email: userData.email,
    name: userData.name,
    avatar: userData.avatar,
  });

  // Remove sensitive data before returning
  const { id, email, name, avatar, isAdmin } = newUser;
  return { id, email, name, avatar, isAdmin };
};

/**
 * User login
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Object} User data and token
 */
export const loginUser = (credentials) => {
  // In a real app, we would verify the password hash
  const user = userController.getUserByEmail(credentials.email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // In a real app, we would generate and return a JWT token
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    },
    token: "mock-jwt-token",
  };
};

/**
 * Get user profile
 * @param {string} userId - User ID
 * @returns {Object} User profile data
 */
export const getUserProfile = (userId) => {
  const user = userController.getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Remove sensitive data
  const { id, email, name, avatar, isAdmin } = user;
  return { id, email, name, avatar, isAdmin };
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} userData - User data to update
 * @returns {Object} Updated user profile
 */
export const updateUserProfile = (userId, userData) => {
  const updatedUser = userController.updateUser(userId, userData);
  if (!updatedUser) {
    throw new Error("User not found");
  }

  // Remove sensitive data
  const { id, email, name, avatar, isAdmin } = updatedUser;
  return { id, email, name, avatar, isAdmin };
};
