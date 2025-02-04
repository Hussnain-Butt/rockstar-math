const mongoose = require("mongoose");

const RegisterationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    numStudents: { type: Number, required: true },
    studentDetails: { type: String, required: true }, // Stores Name, Grade, Math Level
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    goals: { type: String, required: true },
    smsAgreement: { type: Boolean, required: true },
    webcamAgreement: { type: Boolean, required: true },
    smsCode: { type: String, required: false }, // OTP Code
    isVerified: { type: Boolean, default: false } // Flag for SMS verification
}, { timestamps: true });

module.exports = mongoose.model("Registeration", RegisterationSchema);
