import connectToDatabase from "../lib/mongodb";
import Order from "../models/Order";
import Product from "../models/Product";

// Create a new order
export const createOrder = async (orderData) => {
  await connectToDatabase();

  try {
    // Calculate order total and create order items
    const orderItems = [];
    let total = 0;

    for (const item of orderData.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      // Calculate price (considering discounts)
      const price = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price,
      });

      total += price * item.quantity;
    }

    // Create the order
    const order = new Order({
      userId: orderData.userId,
      items: orderItems,
      total,
      status: "pending",
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
    });

    await order.save();
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get user orders
export const getUserOrders = async (userId) => {
  await connectToDatabase();

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    console.error(`Error fetching orders for user ${userId}:`, error);
    throw error;
  }
};

// Get order details
export const getOrderDetails = async (orderId) => {
  await connectToDatabase();

  try {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  await connectToDatabase();

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true },
    );

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error) {
    console.error(`Error updating status for order ${orderId}:`, error);
    throw error;
  }
};
