import connectToDatabase from "../lib/mongodb";
import User from "../models/User";

// Register a new user
export const registerUser = async (userData) => {
  await connectToDatabase();

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return userResponse;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  await connectToDatabase();

  try {
    // Find user by email
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // In a real app, we would verify the password hash here
    // For now, we'll just check if the password matches (not secure for production)
    if (user.password !== credentials.password) {
      throw new Error("Invalid credentials");
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // In a real app, we would generate and return a JWT token
    return {
      user: userResponse,
      token: "mock-jwt-token",
    };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  await connectToDatabase();

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return userResponse;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  await connectToDatabase();

  try {
    // Don't allow updating email to one that already exists
    if (userData.email) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error("Email already in use");
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { ...userData, updatedAt: Date.now() },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new Error("User not found");
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return userResponse;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};
