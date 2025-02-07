const express = require("express");
const router = express.Router();
require("dotenv").config();  // Ensure environment variables are loaded

// ✅ Use Stripe Secret Key from environment variable
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



router.get("/test-products", async (req, res) => {
    try {
      const allProducts = await stripe.products.list({ active: true });
      console.log("Fetched Products from Stripe:", allProducts.data);
      res.status(200).json(allProducts.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });


  router.get("/get-plans", async (req, res) => {
    try {
        let allProducts = [];
        let hasMore = true;
        let lastProductId = null;

        // Fetch all products using pagination and expand default_price
        while (hasMore) {
            const params = { 
                active: true, 
                limit: 10, 
                expand: ["data.default_price"] // ✅ Expand Price Object
            };

            if (lastProductId) params.starting_after = lastProductId;

            const products = await stripe.products.list(params);
            
            allProducts = [...allProducts, ...products.data];

            hasMore = products.has_more;
            if (products.data.length > 0) {
                lastProductId = products.data[products.data.length - 1].id;
            }
        }

        // ✅ Filter Only "Learn, Achieve, Excel"
        const filteredProducts = allProducts.filter(product =>
            ["Learn", "Achieve", "Excel"].includes(product.name)
        );

        if (filteredProducts.length === 0) {
            return res.status(404).json({ message: "No matching subscription plans found" });
        }

        // ✅ Format Data for Frontend
        const formattedProducts = filteredProducts.map(product => {
            // ✅ Price Handling
            let priceAmount = "N/A";
            let currency = "USD"; // Default currency
            if (product.default_price && product.default_price.unit_amount) {
                priceAmount = (product.default_price.unit_amount / 100).toFixed(2);
                currency = product.default_price.currency.toUpperCase();
            }

            return {
                id: product.id,
                name: product.name,
                description: product.description || "No description available",
                images: product.images.length > 0 ? product.images[0] : "/default-image.png", // ✅ Handle missing images
                price: priceAmount,
                currency: currency
            };
        });

        res.json(formattedProducts);
    } catch (error) {
        console.error("Error fetching plans:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


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


router.post("/create-payment-intent", async (req, res) => {
    try {
        let { amount, currency } = req.body;

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount. Must be greater than 0." });
        }

        amount = Math.round(amount * 100); // ✅ Ensure integer cents conversion

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Always use integer
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

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("❌ Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        console.log("✅ Payment Intent Succeeded:", paymentIntent.id);
        // ✅ Here you can update your database with payment success status
    } else if (event.type === "payment_intent.payment_failed") {
        console.error("❌ Payment Failed:", event.data.object.last_payment_error);
    }

    res.json({ received: true });
});




module.exports = router;
