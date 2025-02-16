const express = require("express");
const router = express.Router();
require("dotenv").config();  // Ensure environment variables are loaded
const { updatePaymentStatus } = require("../controller/paymentController");
const { createZoomMeeting } = require('../controller/zoomController');
const Register = require('../models/registerModel') // ✅ Using Register Model
const stripe = require("stripe")("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");

const ZOOM_LINKS = [
  "https://us06web.zoom.us/meeting/register/mZHoQiy9SqqHx69f4dejgg#/registration",
  "https://us06web.zoom.us/meeting/register/kejThKqpTpetwaMNI33bAQ#/registration",
  "https://us06web.zoom.us/meeting/register/jH2N2rfMSXyqX1UDEZAarQ#/registration",
  "https://us06web.zoom.us/meeting/register/Lsd_MFiwQpKRKhMZhPIYPw#/registration",
  "https://us06web.zoom.us/meeting/register/XsYhADVmQcK8BIT3Sfbpyg#/registration"
];  

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
// ✅ Stripe Webhook for Handling Successful Payments
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
        const productName = session.metadata.planName;
        const amount = session.amount_total / 100; // Convert cents to dollars
        const purchaseDate = new Date().toISOString(); // Capture purchase date

        console.log(`✅ Payment Successful: ${userId} purchased ${productName} for $${amount}`);

        try {
            // ✅ Fetch User from Database
            const user = await Register.findById(userId);
            if (!user) {
                console.error(`❌ User not found: ${userId}`);
                return res.status(404).json({ error: "User not found" });
            }

            // ✅ Ensure `purchasedClasses` exists in user schema
            if (!user.purchasedClasses) {
                user.purchasedClasses = [];
            }

            // ✅ Structure Purchased Product Data Correctly
            const purchasedProduct = {
                name: productName,
                description: `Access to ${productName} subscription`,
                purchaseDate: purchaseDate
            };

            user.purchasedClasses.push(purchasedProduct); // Add product to purchasedClasses array

            // ✅ Update Payment Status in Database
            await updatePaymentStatus(userId, "paid");
            console.log(`✅ Payment status updated for user: ${user.username}`);

            // ✅ Save Purchase Data in Database
            await user.save();
            console.log(`✅ Purchase stored for user: ${user.username}`);

            // ✅ Send Payment Confirmation Email
            const confirmationMessage = `
                <h2>🎉 Thank You for Your Purchase!</h2>
                <p>Hello ${user.username},</p>
                <p>You have successfully purchased <strong>${productName}</strong> for <strong>$${amount}</strong>.</p>
                <p>If you have any issues, feel free to contact our support.</p>
                <p>Happy Learning!</p>
            `;

            await sendEmail(user.billingEmail, "Payment Confirmation - Rockstar Math", "Payment Confirmation", confirmationMessage);
            console.log(`✅ Confirmation email sent to ${user.billingEmail}`);

            // ✅ If it's a subscription plan, create Zoom meetings
            let zoomMeetingData = null;
            if (["Learn", "Achieve", "Excel"].includes(productName)) {
                // ✅ Ensure `zoomMeetings` array exists
                if (!user.zoomMeetings) {
                    user.zoomMeetings = [];
                }

                // ✅ Create Zoom Meeting
                zoomMeetingData = await createZoomMeeting(user.email, productName);
                if (zoomMeetingData) {
                    user.zoomMeetings.push({
                        meetingLink: ZOOM_LINKS,
                        topic: productName,
                        createdAt: new Date(),
                    });

                    console.log(`✅ Zoom Meeting Created for ${user.username}: ${ZOOM_LINKS}`);

                    // ✅ Save updated user data
                    await user.save();

                    // ✅ Send Zoom Meeting Email
                    const zoomMessage = `
                        <h2>🎥 Welcome to ${productName}!</h2>
                        <p>Hello ${user.username},</p>
                        <p>Here is your Zoom link for your sessions:</p>
                        <ul>
                            <li><a href="${ZOOM_LINKS}">${ZOOM_LINKS}</a></li>
                        </ul>
                        <p>We look forward to seeing you in the sessions!</p>
                    `;

                    await sendEmail(user.billingEmail, "Your Zoom Meeting Link - Rockstar Math", "Zoom Link", zoomMessage);
                    console.log(`✅ Zoom meeting email sent to ${user.billingEmail}`);
                }
            }

            res.json({ success: true, message: "Purchase and Zoom meeting (if applicable) stored successfully" });

        } catch (error) {
            console.error("❌ Error Processing Subscription:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.json({ received: true });
    }
});







module.exports = router;
