const express = require("express");
const router = express.Router();
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 📌 Send OTP Route
router.post("/send-otp", async (req, res) => {
    const { phone } = req.body;
    try {
        await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phone, channel: "sms" });

        res.status(200).json({ success: true, message: "OTP sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send OTP", error });
    }
});

// 📌 Verify OTP Route
router.post("/verify-otp", async (req, res) => {
    const { phone, otp } = req.body;
    try {
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phone, code: otp });

        if (verificationCheck.status === "approved") {
            res.status(200).json({ success: true, message: "OTP verified successfully!" });
        } else {
            res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "OTP verification failed", error });
    }
});

module.exports = router;
