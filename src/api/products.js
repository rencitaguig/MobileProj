import connectToDatabase from "../lib/mongodb";
import Product from "../models/Product";

// Get all products with optional filtering
export const getProducts = async ({
  category,
  minPrice,
  maxPrice,
  sortBy,
} = {}) => {
  await connectToDatabase();

  // Build query
  const query = {};

  // Apply category filter
  if (category && category !== "All") {
    query.category = category;
  }

  // Apply price range filter
  if (minPrice !== undefined && maxPrice !== undefined) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice !== undefined) {
    query.price = { $gte: minPrice };
  } else if (maxPrice !== undefined) {
    query.price = { $lte: maxPrice };
  }

  // Build sort options
  let sortOptions = {};
  if (sortBy) {
    switch (sortBy) {
      case "price-asc":
        sortOptions = { price: 1 };
        break;
      case "price-desc":
        sortOptions = { price: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "bestselling":
        sortOptions = { rating: -1 };
        break;
      default:
        // 'featured' - no specific sorting
        break;
    }
  }

  try {
    const products = await Product.find(query).sort(sortOptions);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  await connectToDatabase();

  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  await connectToDatabase();

  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id, productData) => {
  await connectToDatabase();

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { ...productData, updatedAt: Date.now() },
      { new: true, runValidators: true },
    );

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return product;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  await connectToDatabase();

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
