const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();

router.get("/check-user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ billingEmail: req.params.email });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
