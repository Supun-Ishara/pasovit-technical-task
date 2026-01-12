const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById
} = require("../controller/orderCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/user", authMiddleware, getUserOrders);
router.get("/all", authMiddleware, isAdmin, getAllOrders);
router.get("/:id", authMiddleware, getOrderById);

module.exports = router;