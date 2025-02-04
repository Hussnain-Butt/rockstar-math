const express = require("express");
const router = express.Router();
require("dotenv").config();  // Ensure environment variables are loaded

// ✅ Use Stripe Secret Key from environment variable
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ✅ Fetch Stripe Products (Test Mode)
// ✅ Fetch Stripe Products (Test Mode)
router.get("/get-products", async (req, res) => {
    try {
        const products = await stripe.products.list({
            limit: 10, // Fetch up to 10 products
            active: true // Only get active products
        });

        if (products.data.length === 0) {
            return res.json({ message: "No products found in test mode." });
        }

        res.json(products.data);
    } catch (error) {
        console.error("❌ Stripe API Error:", error);
        res.status(500).json({ error: error.message });
    }
});


// ✅ Create Payment Intent (Test Mode)
router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        // Ensure amount is valid
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount. Must be greater than 0." });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert dollars to cents
            currency: currency || "usd",
            payment_method_types: ["card"],
        });

        console.log("✅ PaymentIntent Created:", paymentIntent.id);

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("❌ Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Fetch Payment Details (Test Mode)
router.get("/payment-details/:paymentIntentId", async (req, res) => {
    try {
        const paymentIntentId = req.params.paymentIntentId;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        console.log("✅ Payment Details:", paymentIntent);
        res.json(paymentIntent);
    } catch (error) {
        console.error("❌ Stripe API Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
