const paypal = require('@paypal/checkout-server-sdk');
const client = require('../config/paymentConfig');
const Order = require('../models/Order'); // Optional, if saving orders

// Create PayPal Order
exports.createOrder = async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: req.body.amount, // Dynamically passed from frontend
          },
        },
      ],
    });

    const order = await client.execute(request);
    res.status(200).json({ orderId: order.result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Capture PayPal Payment
exports.captureOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    const capture = await client.execute(request);

    // Save order details to database (optional)
    const newOrder = new Order({
      orderId: capture.result.id,
      status: capture.result.status,
      amount: capture.result.purchase_units[0].amount.value,
    });
    await newOrder.save();

    res.status(200).json({ message: 'Payment captured successfully', capture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
