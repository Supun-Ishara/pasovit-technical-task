const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const sendEmail = require("./emailCtrl");

const createOrder = asyncHandler(async (req, res) => {
  const { shippingInfo, paymentMethod } = req.body;
  const { _id } = req.user;

  try {
    const cartItems = await Cart.find({ userId: _id }).populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cartItems.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0
    );

    const order = await Order.create({
      user: _id,
      shippingInfo,
      orderItems: cartItems.map(item => ({
        product: item.productId._id,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice,
      totalPriceAfterDiscount: totalPrice,
      paymentInfo: {
        method: paymentMethod || "Cash on Delivery"
      }
    });

    await Cart.deleteMany({ userId: _id });

    const user = await User.findById(_id);
    
    const orderItemsHtml = cartItems.map(item => `
      
        ${item.productId.title}
        ${item.size}
        ${item.quantity}
        $${item.price.toFixed(2)}
        $${(item.price * item.quantity).toFixed(2)}
      
    `).join('');

    await sendEmail({
      to: user.email,
      subject: "Order Confirmation - Clothing Store",
      text: `Your order #${order._id} has been placed successfully!`,
      htm: `
        
          Order Confirmation
          Dear ${user.firstName} ${user.lastName},
          Thank you for your order! Here are your order details:
          
          Order Information
          Order ID: ${order._id}
          Order Date: ${new Date(order.createdAt).toLocaleDateString()}
          
          Order Items
                Product
                Size
                Quantity
                Price
                Subtotal
              ${orderItemsHtml}
            
          Total: $${totalPrice.toFixed(2)}
          
          Shipping Address
          
            ${shippingInfo.firstName} ${shippingInfo.lastName}
            ${shippingInfo.address}
            ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.pincode}
            Phone: ${shippingInfo.mobile}
          
          
          If you have any questions, please contact our support team.
          Best regards,Clothing Store Team
        
      `
    });

    res.json({ success: true, order });
  } catch (error) {
    throw new Error(error);
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const orders = await Order.find({ user: _id })
      .populate("orderItems.product")
      .sort("-createdAt");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("orderItems.product")
      .sort("-createdAt");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate("user")
      .populate("orderItems.product");
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
};