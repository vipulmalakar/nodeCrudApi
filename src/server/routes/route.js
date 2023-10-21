const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");

router.get("/", (req, res) => {
  res.status(200).json({ success: "true", message: "Welcome to the API" });
});

// auth routes
router.use("/auth", require("./authRoutes"));

// admin routes
router.use("/admin", [authenticate, authorize(["admin"])], adminRoutes);

// user routes
router.use("/user", [authenticate, authorize(["user"])], userRoutes);

module.exports = router;
