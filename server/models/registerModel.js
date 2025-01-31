const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
    adultName: { type: String, required: true },
    numStudents: { type: Number, required: true },
    studentNames: { type: [String], required: true },
    studentGrades: { type: [String], required: true },
    studentMathLevels: { type: [String], required: true },
    billingEmail: { type: String, required: true },
    schedulingEmails: { type: [String], required: true },
    phone: { type: String, required: true },
    goals: { type: String, required: true },
    smsAgreement: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Register", RegisterSchema);
