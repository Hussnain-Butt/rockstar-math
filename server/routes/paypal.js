const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");
const client = require("../config/paymentConfig");
const Order = require("../models/OrderModel"); // ✅ Import Order Model

// ✅ Create PayPal Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "USD" } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: currency, value: amount } }],
    });

    const order = await client.execute(request);
    console.log(`✅ PayPal Order Created: ${order.result.id}`);
    res.status(200).json({ orderId: order.result.id });
  } catch (error) {
    console.error("❌ PayPal Order Error:", error.message);
    res.status(500).json({ error: "PayPal order creation failed" });
  }
});

// ✅ Capture PayPal Payment
router.post("/capture-order", async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ error: "Order ID is required" });

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    const capture = await client.execute(request);
    const captureData = capture.result;

    console.log(`✅ PayPal Payment Captured: ${captureData.id}`);

    await Order.create({
      orderId: captureData.id,
      status: captureData.status,
      amount: captureData.purchase_units[0].amount.value,
      currency: captureData.purchase_units[0].amount.currency_code,
    });

    res.status(200).json({ message: "PayPal Payment Captured Successfully", orderId: captureData.id });
  } catch (error) {
    console.error("❌ PayPal Capture Error:", error.message);
    res.status(500).json({ error: "Failed to capture PayPal payment" });
  }
});

module.exports = router;
