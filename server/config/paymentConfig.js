const paypal = require('@paypal/checkout-server-sdk');
require("dotenv").config();

// ✅ PayPal Environment Setup
const environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);
// ✅ Create PayPal Client
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
