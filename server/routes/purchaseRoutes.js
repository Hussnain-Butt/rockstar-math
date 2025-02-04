const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const authMiddleware = require("../middlewares/authMiddleware");

// ✅ Secure this route with authentication middleware
router.get("/user/:userId", authMiddleware.protect, async (req, res) => {
  try {
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const purchases = await Purchase.find({ userId }).populate("productId");
    if (!purchases.length) {
      return res.status(404).json({ message: "No purchases found for this user." });
    }

    res.json(purchases);
  } catch (error) {
    console.error("❌ Error fetching purchases:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
