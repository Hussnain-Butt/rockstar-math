require("dotenv").config();
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY ? "Loaded ✅" : "Not Loaded ❌");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require("./routes/registerRoutes");
const otpRoutes = require("./routes/otpRoutes");

const subscribeRoute = require("./routes/subscribeRoute");
const contactRoutes = require('./routes/contactRoutes');
const stripeRoutes = require("./routes/stripe"); // Import the Stripe route


connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true,
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

app.use("/api", subscribeRoute);
app.use('/api/contact', contactRoutes);
app.use("/api/stripe", stripeRoutes); // Set up route
app.use("/api", registerRoutes);
app.use("/api", otpRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
