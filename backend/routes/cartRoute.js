const express = require("express");
const {
  addToCart,
  getUserCart,
  removeFromCart,
  updateCartQuantity,
  clearCart
} = require("../controller/cartCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getUserCart);
router.delete("/:cartItemId", authMiddleware, removeFromCart);
router.put("/:cartItemId", authMiddleware, updateCartQuantity);
router.delete("/clear/all", authMiddleware, clearCart);

module.exports = router;