require("dotenv").config();
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY ? "Loaded ✅" : "Not Loaded ❌");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require("./routes/registerRoutes");
// const otpRoutes = require("./routes/otpRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const subscribeRoute = require("./routes/subscribeRoute");
const contactRoutes = require('./routes/contactRoutes');
const stripeRoutes = require("./routes/stripe"); // Import the Stripe route
const twilio = require("twilio");
const consultationRoutes = require("./routes/consultationRoutes");

connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true,
}));
app.use(bodyParser.json());
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
console.log("Twilio SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("Twilio Auth Token:", process.env.TWILIO_AUTH_TOKEN);
console.log("Twilio Phone:", process.env.TWILIO_PHONE_NUMBER);
console.log("Twilio SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("Twilio Auth Token:", process.env.TWILIO_AUTH_TOKEN);
console.log("Twilio Phone:", process.env.TWILIO_PHONE_NUMBER);
app.post("/api/send-otp", async (req, res) => {
    const { phone } = req.body;
  
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required!" });
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  
    try {
      const message = await client.messages.create({
        body: `Your OTP code is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
  
      console.log("OTP Sent:", message.sid); // Debugging log
      res.json({ success: true, otp }); // ⚠️ Remove OTP from response in production
    } catch (error) {
      console.error("Twilio Error:", error);
      res.status(500).json({ error: "Failed to send OTP. Please check Twilio settings!" });
    }
  });
// Routes
app.use('/api/auth', authRoutes);

app.use("/api", subscribeRoute);
app.use('/api/contact', contactRoutes);
app.use("/api/stripe", stripeRoutes); // Set up route
app.use("/api", registerRoutes);
// app.use("/api/otp", otpRoutes);
app.use("/api/consultation", consultationRoutes);
app.use("/api/purchases", purchaseRoutes); // Ensure correct path
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
