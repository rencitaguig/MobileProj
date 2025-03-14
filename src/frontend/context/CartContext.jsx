import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * @typedef {Object} CartItem
 * @property {string} productId
 * @property {string} name
 * @property {number} price
 * @property {string} image
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartContextType
 * @property {CartItem[]} items
 * @property {function(Object): void} addItem
 * @property {function(string): void} removeItem
 * @property {function(string, number): void} updateQuantity
 * @property {function(): void} clearCart
 * @property {number} totalItems
 * @property {number} totalPrice
 */

const CartContext = createContext(undefined);

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  /**
   * Add item to cart
   * @param {Object} item
   * @param {string} item.productId
   * @param {string} item.name
   * @param {number} item.price
   * @param {string} item.image
   */
  const addItem = (item) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.productId === item.productId,
      );

      if (existingItemIndex >= 0) {
        // Item already exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  /**
   * Remove item from cart
   * @param {string} productId
   */
  const removeItem = (productId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId),
    );
  };

  /**
   * Update item quantity
   * @param {string} productId
   * @param {number} quantity
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      );
    });
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate total items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
