import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "../../context/CartContext";
import { AuthProvider } from "../../context/AuthContext";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default Layout;
