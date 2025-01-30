const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);  // Load secret key

router.get("/get-products", async (req, res) => {
    try {
        const products = await stripe.products.list({ expand: ["data.default_price"] });

        const formattedProducts = products.data.map((product) => ({
            id: product.id,
            name: product.name,
            details: product.description || "No description available",
            duration: "Varies",
            created: new Date(product.created * 1000).toLocaleDateString(),
            price: product.default_price ? (product.default_price.unit_amount / 100).toFixed(2) : "N/A",
            currency: product.default_price ? product.default_price.currency.toUpperCase() : "USD",
        }));

        res.json(formattedProducts);
    } catch (error) {
        console.error("Stripe API Error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert dollars to cents
            currency,
            payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
