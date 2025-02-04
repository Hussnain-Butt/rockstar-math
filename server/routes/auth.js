const express = require("express");
const router = express.Router();
const User = require("../models/User");
const twilio = require("twilio");
const { check, validationResult } = require("express-validator");

// Twilio Credentials
const accountSid = 'AC75e9fbdaa03266d90065fb6b191c0fca';
const authToken = 'b99d34a9a8620206cf53cd4a89fb645c';
const twilioPhone = '+923284842596';


const client = twilio(accountSid, authToken);

// Generate OTP Function
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Store OTP in memory (Use DB in production)
const otpStore = {};


// ✅ User Registration + OTP Generation
router.post("/register", [
    check("name").notEmpty().withMessage("Name is required"),
    check("numStudents").isInt().withMessage("Number of students must be a number"),
    check("studentDetails").notEmpty().withMessage("Student details are required"),
    check("email").isEmail().withMessage("Valid email required"),
    check("phone").isMobilePhone().withMessage("Valid phone number required"),
    check("goals").notEmpty().withMessage("Goals and expectations are required"),
    check("smsAgreement").isBoolean(),
    check("webcamAgreement").isBoolean()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, numStudents, studentDetails, email, phone, goals, smsAgreement, webcamAgreement } = req.body;

    try {
        // Generate OTP Code
        const smsCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save user to DB
        const newUser = new User({ name, numStudents, studentDetails, email, phone, goals, smsAgreement, webcamAgreement, smsCode });
        await newUser.save();

        // Send OTP via Twilio
        await twilioClient.messages.create({
            body: `Your verification code is: ${smsCode}`,
            from: twilioPhone,
            to: phone
        });

        res.status(201).json({ message: "User registered, OTP sent!", userId: newUser._id });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Server error. Try again." });
    }
});

const formatPhoneNumber = (phone) => {
    if (!phone.startsWith("+")) {
        throw new Error("Phone number must be in E.164 format (e.g., +923001234567)");
    }
    return phone;
};

// ✅ Route to Send OTP
router.post("/send-otp", async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone number is required!" });
        }

        console.log("Sending OTP to:", phone);

        // ✅ Check if phone number is in correct format
        if (!phone.startsWith('+')) {
            return res.status(400).json({ success: false, message: "Phone number must be in E.164 format (+1234567890)" });
        }

        // ✅ Send OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        console.log("Generated OTP:", otp);

        const message = await client.messages.create({
            body: `Your verification code is: ${otp}`,
            from: twilioPhone,
            to: phone,
        });

        console.log("Twilio Response:", message);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: otp, // Store OTP in DB in production
        });
    } catch (error) {
        console.error("Twilio Error:", error);
        return res.status(500).json({ success: false, message: "Failed to send OTP", error });
    }
});
// ✅ Route to Verify OTP
router.post("/verify-otp", (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ success: false, message: "Phone number and OTP are required" });
    }

    if (otpStore[phone] && otpStore[phone] === otp) {
        delete otpStore[phone]; // Remove OTP after verification
        res.json({ success: true, message: "OTP verified successfully" });
    } else {
        res.status(400).json({ success: false, message: "Invalid OTP" });
    }
});

module.exports = router;
