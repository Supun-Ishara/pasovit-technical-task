const express = require("express");
const {
  createUser,
  loginUserCtrl,
  logout,
  getaUser,
  updateaUser,
} = require("../controller/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/logout", authMiddleware, logout);
router.get("/:id", authMiddleware, getaUser);
router.put("/edit-user", authMiddleware, updateaUser);

module.exports = router;