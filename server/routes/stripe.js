const express = require("express");
const router = express.Router();
require("dotenv").config();  // Ensure environment variables are loaded
const { updatePaymentStatus } = require("../controller/paymentController");
const { createZoomMeeting } = require('../controller/zoomController');
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

        console.log("🔹 Received Payment Request:", { amount, currency, userId, orderId });

        if (!userId || !orderId) {
            console.error("❌ Missing userId or orderId.");
            return res.status(400).json({ error: "Missing userId or orderId." });
        }

        if (!amount || isNaN(amount) || amount <= 0) {
            console.error("❌ Invalid amount received:", amount);
            return res.status(400).json({ error: "Invalid amount. Must be greater than 0." });
        }

        amount = Math.round(amount * 100); // Convert to cents

        const supportedCurrencies = ["usd", "eur", "gbp", "cad", "aud"];
        if (!currency || !supportedCurrencies.includes(currency.toLowerCase())) {
            console.error("❌ Unsupported currency:", currency);
            return res.status(400).json({ error: "Unsupported currency. Use USD, EUR, GBP, etc." });
        }

        // ✅ FIXED: Use correct payment_method_types
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency.toLowerCase(),
            payment_method_types: ["card"], // ✅ Ensure "card" is used (no Apple Pay, Google Pay unless enabled)
            metadata: {
                userId,
                orderId,
            },
        });

        if (!paymentIntent.client_secret) {
            console.error("❌ Missing client_secret in response:", paymentIntent);
            return res.status(500).json({ error: "Payment Intent creation failed. No client_secret returned." });
        }

        console.log(`✅ PaymentIntent Created: ${paymentIntent.id} for User: ${userId}`);

        res.json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id });

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


// ✅ Stripe Webhook for Handling Successful Subscriptions
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('❌ Stripe Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.client_reference_id;
        const planName = session.metadata.planName;

        console.log(`✅ Subscription Successful: ${userId} subscribed to ${planName}`);

        try {
            // ✅ Get User from Database
            const user = await User.findById(userId);
            if (!user) return console.error(`❌ User not found: ${userId}`);

            // ✅ Create Zoom Meeting
            const meetingData = await createMeetingForUser(user.email, planName);

            // ✅ Save Zoom Meeting in User Database
            user.zoomMeetings.push(meetingData);
            await user.save();

            console.log(`✅ Zoom Meeting Created for ${planName}: ${meetingData.joinUrl}`);
        } catch (error) {
            console.error("❌ Error Handling Subscription:", error);
        }
    }

    res.json({ received: true });
});





module.exports = router;
