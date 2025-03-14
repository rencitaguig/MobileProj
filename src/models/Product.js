import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
    maxlength: [100, "Product name cannot be more than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
    min: [0, "Price cannot be negative"],
  },
  image: {
    type: String,
    required: [true, "Please provide a product image"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot be more than 5"],
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be negative"],
    max: [100, "Discount cannot be more than 100%"],
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: [true, "Please provide a product category"],
    enum: ["Men", "Women", "Kids", "Accessories", "Footwear", "Outerwear"],
  },
  description: {
    type: String,
    required: [true, "Please provide a product description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  stock: {
    type: Number,
    required: [true, "Please provide product stock"],
    min: [0, "Stock cannot be negative"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
ProductSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
