const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const addToCart = asyncHandler(async (req, res) => {
  const { productId, size, quantity, price } = req.body;
  const userId = req.user?._id || null;

  try {
    const existingItem = await Cart.findOne({
      userId,
      productId,
      size
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      // Populate product data before returning
      await existingItem.populate('productId');
      return res.json(existingItem);
    }

    const newCartItem = await Cart.create({
      userId,
      productId,
      size,
      price,
      quantity,
    });
    
    // Populate product data before returning
    await newCartItem.populate('productId');
    res.json(newCartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId"); // This is correct - populate the product
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;

  try {
    await Cart.deleteOne({ userId: _id, _id: cartItemId });
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    throw new Error(error);
  }
});

const updateCartQuantity = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await Cart.findOneAndUpdate(
      { userId: _id, _id: cartItemId },
      { quantity },
      { new: true }
    ).populate("productId");
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const clearCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    await Cart.deleteMany({ userId: _id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addToCart,
  getUserCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
};