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
        let allProducts = [];
        let hasMore = true;
        let lastProductId = null;
        const excludedProducts = ["Learn", "Achieve", "Excel"];

        // ✅ Fetch all products using pagination
        while (hasMore) {
            const params = { 
                active: true, 
                limit: 10, // Fetch 10 at a time to avoid overload
                expand: ["data.default_price"] // Expand price for frontend
            };

            if (lastProductId) params.starting_after = lastProductId;

            const response = await stripe.products.list(params);

            // ✅ Filter out excluded products
            const filteredProducts = response.data.filter(product => !excludedProducts.includes(product.name));

            allProducts = [...allProducts, ...filteredProducts];

            hasMore = response.has_more;
            if (response.data.length > 0) {
                lastProductId = response.data[response.data.length - 1].id;
            }
        }

        if (allProducts.length === 0) {
            return res.status(404).json({ message: "No products found in Stripe." });
        }

        res.json(allProducts);
    } catch (error) {
        console.error("❌ Stripe API Error:", error);
        res.status(500).json({ error: "Failed to fetch products. Please try again later." });
    }
});




router.post("/create-payment-intent", async (req, res) => {
    try {
        let { amount, currency, userId, orderId } = req.body;

        // ✅ Validate Amount
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount. Must be greater than 0." });
        }

        amount = Math.round(amount * 100); // ✅ Convert amount to cents

        // ✅ Ensure currency is supported by Stripe
        const supportedCurrencies = ["usd", "eur", "gbp", "cad", "aud"];
        if (!currency || !supportedCurrencies.includes(currency.toLowerCase())) {
            return res.status(400).json({ error: "Unsupported currency. Use USD, EUR, GBP, etc." });
        }

        // ✅ Define Payment Methods Dynamically (Supports Google Pay, Apple Pay, etc.)
        const paymentMethods = ["card", "apple_pay", "google_pay"];

        // ✅ Create Payment Intent with Metadata
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Must be an integer (cents)
            currency: currency.toLowerCase(),
            payment_method_types: paymentMethods,
            metadata: {
                userId: userId || "anonymous",
                orderId: orderId || "unknown",
            },
        });

        console.log(`✅ PaymentIntent Created: ${paymentIntent.id} for User: ${userId || "N/A"}`);

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("❌ Stripe Payment Intent Error:", error);
        res.status(500).json({ error: "Payment creation failed. Please try again later." });
    }
});


// ✅ Fetch Payment Details (Test Mode)
router.get("/payment-details/:paymentIntentId", async (req, res) => {
    try {
        const paymentIntentId = req.params.paymentIntentId;

        // ✅ Validate Payment Intent ID (Must start with "pi_")
        if (!paymentIntentId || !paymentIntentId.startsWith("pi_")) {
            return res.status(400).json({ error: "Invalid Payment Intent ID." });
        }

        // ✅ Retrieve Payment Intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        console.log(`✅ Payment Retrieved: ID=${paymentIntent.id}, Status=${paymentIntent.status}`);

        // ✅ Send only necessary details (Avoid exposing sensitive data)
        res.json({
            id: paymentIntent.id,
            amount: paymentIntent.amount / 100, // Convert cents to dollars
            currency: paymentIntent.currency.toUpperCase(),
            status: paymentIntent.status,
            payment_method: paymentIntent.payment_method_types[0] || "unknown",
            created_at: new Date(paymentIntent.created * 1000).toISOString(),
        });

    } catch (error) {
        console.error("❌ Stripe API Error:", error.message);
        
        // ✅ Handle Different Stripe Errors Gracefully
        if (error.type === "StripeInvalidRequestError") {
            return res.status(400).json({ error: "Invalid Payment Intent ID." });
        }

        res.status(500).json({ error: "Failed to retrieve payment details. Try again later." });
    }
});


router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        // ✅ Verify Webhook Signature
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("❌ Webhook Signature Verification Failed:", err.message);
        return res.status(400).json({ success: false, error: `Webhook Signature Error: ${err.message}` });
    }

    // ✅ Extract Event Data
    const eventType = event.type;
    const eventData = event.data.object;

    // ✅ Handle Different Event Types
    switch (eventType) {
        case "payment_intent.succeeded":
            console.log(`✅ Payment Success: ID=${eventData.id}, Amount=$${eventData.amount / 100}`);

            // ✅ Update Database (Example)
            await updatePaymentStatus(eventData.id, "succeeded");

            break;

        case "payment_intent.payment_failed":
            console.error(`❌ Payment Failed: ID=${eventData.id}, Reason=${eventData.last_payment_error?.message || "Unknown Error"}`);

            // ✅ Update Database with Failed Payment (Example)
            await updatePaymentStatus(eventData.id, "failed");

            break;

        case "checkout.session.completed":
            console.log(`✅ Checkout Completed: Session ID=${eventData.id}, Customer=${eventData.customer}`);

            // ✅ Handle Checkout Completion (Example: Activate Subscription)
            await handleCheckoutCompletion(eventData.id, eventData.customer);

            break;

        default:
            console.log(`ℹ️ Unhandled Event Type: ${eventType}`);
    }

    res.json({ success: true, received: true });
});




module.exports = router;
