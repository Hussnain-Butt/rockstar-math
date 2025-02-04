const Register = require("../models/registerModel");

// ✅ Handle User Registration
const registerUser = async (req, res) => {
  try {
    // ✅ Extract data from request body
    const {
      userType,
      adultName,
      numStudents,
      studentNames,
      studentGrades,
      studentMathLevels,
      billingEmail,
      schedulingEmails,
      phone,
      parentEmail,
      parentPhone,
      studentPhone,
      goals,
      didUserApproveSMS,
      didUserApproveWebcam,
    } = req.body;

    // ✅ Basic validation (Ensure required fields are not empty)
    if (
      !userType ||
      !adultName ||
      !numStudents ||
      !studentNames ||
      !studentGrades ||
      !studentMathLevels ||
      !billingEmail ||
      !schedulingEmails ||
      !phone ||
      !goals
    ) {
      return res.status(400).json({ success: false, error: "Please fill all required fields!" });
    }

    // ✅ Additional validation based on user type
    if (userType === "Student" && (!parentEmail || !parentPhone)) {
      return res.status(400).json({
        success: false,
        error: "Students must provide Parent's Email and Phone Number!",
      });
    }

    if (userType === "Parent" && studentPhone && !didUserApproveSMS) {
      return res.status(400).json({
        success: false,
        error: "Parents adding a Student's Phone must agree to SMS notifications!",
      });
    }

    // ✅ Create a new user entry
    const newUser = new Register({
      userType,
      adultName,
      numStudents,
      studentNames,
      studentGrades,
      studentMathLevels,
      billingEmail,
      schedulingEmails,
      phone,
      parentEmail: parentEmail || null, // Optional for Parent
      parentPhone: parentPhone || null, // Optional for Parent
      studentPhone: studentPhone || null, // Optional for Student
      goals,
      didUserApproveSMS: didUserApproveSMS || false,
      didUserApproveWebcam: didUserApproveWebcam || false,
    });

    // ✅ Save the data to MongoDB
    const savedUser = await newUser.save();

    // ✅ Send success response
    res.status(201).json({
      success: true,
      message: "Registration successful!",
      user: savedUser,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ success: false, error: "Registration failed. Please try again!" });
  }
};

module.exports = { registerUser };
