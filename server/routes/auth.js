const express = require("express");
const router = express.Router();
const User = require("../models/User");
const twilio = require("twilio");
const { check, validationResult } = require("express-validator");

// Twilio Configuration
// const accountSid = "SK1f59edab4179cfbd3376dc12f4cfeaf4";
// const authToken = "WE1M439TFuE2SZdsljNczTVssfvPklIM";
// const twilioClient = twilio(accountSid, authToken);
// const twilioPhone = "+923284842596";

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

// ✅ OTP Verification Route
router.post("/verify-otp", async (req, res) => {
    const { userId, otp } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.smsCode === otp) {
            user.isVerified = true;
            user.smsCode = null;
            await user.save();
            res.json({ message: "Phone verified successfully!" });
        } else {
            res.status(400).json({ error: "Invalid OTP code" });
        }
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({ error: "Server error. Try again." });
    }
});

module.exports = router;
