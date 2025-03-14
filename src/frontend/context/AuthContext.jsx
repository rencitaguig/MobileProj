import React, { createContext, useContext, useState, useEffect } from "react";
import { userApi } from "../api";

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 * @property {boolean} [isAdmin]
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} isLoading
 * @property {function(string, string): Promise<void>} login
 * @property {function(Object): Promise<void>} register
 * @property {function(): void} logout
 * @property {function(Object): Promise<void>} updateProfile
 */

const AuthContext = createContext(undefined);

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        try {
          // In a real app, we would verify the token with the backend
          const userData = await userApi.getProfile(userId);
          setUser(userData);
        } catch (error) {
          console.error("Failed to authenticate user:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Login function
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { user, token } = await userApi.login({ email, password });
      setUser(user);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user.id);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register function
   * @param {Object} userData
   * @param {string} userData.name
   * @param {string} userData.email
   * @param {string} userData.password
   * @param {string} [userData.avatar]
   * @returns {Promise<void>}
   */
  const register = async (userData) => {
    setIsLoading(true);
    try {
      const newUser = await userApi.register(userData);
      // Auto login after registration
      await login(userData.email, userData.password);
      return newUser;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
  };

  /**
   * Update profile function
   * @param {Object} userData
   * @returns {Promise<void>}
   */
  const updateProfile = async (userData) => {
    if (!user) throw new Error("User not authenticated");

    setIsLoading(true);
    try {
      const updatedUser = await userApi.updateProfile(user.id, userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
