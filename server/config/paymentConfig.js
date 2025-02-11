const paypal = require('@paypal/checkout-server-sdk');
require("dotenv").config();

// ✅ PayPal Environment Setup
const environment = new paypal.core.SandboxEnvironment(
    "AeomWj4L8mlq-ezy4Uv0He0-zb4HV5rYqv-qPDczww0pqQAirAxpF-kv33JYwDvn9ChImPjuu5eB", 
    "AeomWj4L8mlq-ezy4Uv0He0-zb4HV5rYqv-qPDczww0pqQAirAxpF-kv33JYwDvn9ChImPjuu5eB1_ak"
);
// ✅ Create PayPal Client
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
