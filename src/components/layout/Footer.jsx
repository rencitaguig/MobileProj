import React from "react";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

/**
 * @typedef {Object} FooterProps
 * @property {string} [companyName]
 * @property {string} [companyAddress]
 * @property {string} [companyPhone]
 * @property {string} [companyEmail]
 * @property {Object} [socialLinks]
 * @property {string} [socialLinks.facebook]
 * @property {string} [socialLinks.twitter]
 * @property {string} [socialLinks.instagram]
 * @property {string[]} [categories]
 * @property {Array<{title: string, href: string}>} [customerServiceLinks]
 */

/**
 * @param {FooterProps} props
 */
const Footer = ({
  companyName = "Fashion Store",
  companyAddress = "123 Fashion Street, Style City, SC 12345",
  companyPhone = "+1 (555) 123-4567",
  companyEmail = "contact@fashionstore.com",
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  categories = [
    "Men's Clothing",
    "Women's Clothing",
    "Accessories",
    "Footwear",
    "New Arrivals",
    "Sale",
  ],
  customerServiceLinks = [
    { title: "Shipping & Returns", href: "/shipping-returns" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact Us", href: "/contact" },
    { title: "Size Guide", href: "/size-guide" },
    { title: "Order Tracking", href: "/order-tracking" },
  ],
}) => {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{companyName}</h3>
            <div className="flex items-start space-x-2 mb-2">
              <MapPin className="h-5 w-5 mt-0.5" />
              <p className="text-gray-300">{companyAddress}</p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="h-5 w-5" />
              <p className="text-gray-300">{companyPhone}</p>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="h-5 w-5" />
              <p className="text-gray-300">{companyEmail}</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a
                href={socialLinks.facebook}
                aria-label="Facebook"
                className="hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.twitter}
                aria-label="Twitter"
                className="hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.instagram}
                aria-label="Instagram"
                className="hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <a
                    href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerServiceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates on new arrivals and special
              promotions
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights
            reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
