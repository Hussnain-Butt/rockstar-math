const express = require("express");
const router = express.Router();
const User = require("../models/registerModel");

// 📌 Register User Route
router.post("/register", async (req, res) => {
    try {
      const {
        adultName,
        numStudents,
        studentNames,
        studentGrades,
        studentMathLevels,
        billingEmail,
        schedulingEmails,
        phone,
        goals,
        smsAgreement,
        webcamAgreement
      } = req.body;
  
      if (!adultName || !numStudents || !studentNames || !studentGrades || !studentMathLevels || 
          !billingEmail || !schedulingEmails || !phone || !goals) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      const newUser = new User({
        adultName,
        numStudents,
        studentNames,
        studentGrades,
        studentMathLevels,
        billingEmail,
        schedulingEmails,
        phone,
        goals,
        smsAgreement,
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/api/check-user/:email", async (req, res) => {
    const userEmail = req.params.email;
    const existingUser = await User.findOne({ billingEmail: userEmail });

    if (existingUser) {
        return res.json({ exists: true });
    } else {
        return res.json({ exists: false });
    }
});
module.exports = router;
