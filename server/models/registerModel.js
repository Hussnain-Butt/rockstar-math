const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
  {
    userType: { type: String, required: true },
    studentAge: { type: Number }, // ✅ Added Student Age field
    adultName: { type: String, required: true },
    numStudents: { type: Number, required: true },
    studentNames: { type: String, required: true },
    studentGrades: { type: String, required: true },
    studentMathLevels: { type: String, required: true },
    billingEmail: { type: String, required: true },
    schedulingEmails: { type: String, required: true },
    phone: { type: String, required: true },
    parentEmail: { type: String },
    parentPhone: { type: String },
    studentPhone: { type: String },
    goals: { type: String, required: true },
    didUserApproveSMS: { type: Boolean, default: false },
    didUserApproveWebcam: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Register", RegisterSchema);
