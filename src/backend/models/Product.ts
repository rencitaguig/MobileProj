/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} image
 * @property {number} rating
 * @property {number} [discount]
 * @property {boolean} [isNew]
 * @property {string} category
 * @property {string} [description]
 * @property {number} [stock]
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]
 */

// This would be replaced with actual database models
// For now, we'll use a mock implementation
/** @type {Product[]} */
export const products = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    rating: 4.5,
    discount: 10,
    isNew: true,
    category: "Men",
    description:
      "A comfortable classic cotton t-shirt perfect for everyday wear.",
    stock: 100,
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    rating: 4.2,
    category: "Men",
    description: "Modern slim fit jeans with a comfortable stretch fabric.",
    stock: 75,
  },
  {
    id: "3",
    name: "Summer Floral Dress",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400&q=80",
    rating: 4.7,
    isNew: true,
    category: "Women",
    description: "A beautiful floral dress perfect for summer occasions.",
    stock: 50,
  },
  {
    id: "4",
    name: "Leather Jacket",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
    rating: 4.8,
    discount: 15,
    category: "Outerwear",
    description:
      "Classic leather jacket with a modern fit and durable construction.",
    stock: 30,
  },
  {
    id: "5",
    name: "Running Shoes",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    rating: 4.4,
    category: "Footwear",
    description:
      "Lightweight running shoes with responsive cushioning for maximum comfort.",
    stock: 60,
  },
  {
    id: "6",
    name: "Kids Denim Overalls",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80",
    rating: 4.3,
    discount: 5,
    category: "Kids",
    description: "Cute and durable denim overalls for active kids.",
    stock: 45,
  },
  {
    id: "7",
    name: "Leather Handbag",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
    rating: 4.6,
    category: "Accessories",
    description:
      "Elegant leather handbag with multiple compartments and adjustable strap.",
    stock: 25,
  },
  {
    id: "8",
    name: "Wool Beanie",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80",
    rating: 4.1,
    category: "Accessories",
    description: "Warm and stylish wool beanie for cold weather.",
    stock: 80,
  },
];
