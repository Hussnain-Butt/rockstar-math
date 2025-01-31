import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RegisterBeforeCheckout = () => {
    const [formData, setFormData] = useState({
        adultName: "",  // ✅ Match backend field name
        numStudents: "",
        studentNames: "",
        studentGrades: "",
        studentMathLevels: "",
        billingEmail: "",
        schedulingEmails: "",
        phone: "",
        goals: "",
        smsAgreement: false,
        webcamAgreement: false
    });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

    if (name === "smsAgreement" && !checked) {
      setOtpSent(false);
      setOtpVerified(false);
      setFormData((prev) => ({ ...prev, otp: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/register", {
            adultName: formData.adultName, // ✅ Corrected field name
            numStudents: formData.numStudents,
            studentNames: formData.studentNames.split(","), // Convert to array
            studentGrades: formData.studentGrades.split(","), // Convert to array
            studentMathLevels: formData.studentMathLevels.split(","), // Convert to array
            billingEmail: formData.billingEmail,
            schedulingEmails: formData.schedulingEmails.split(","), // Convert to array
            phone: formData.phone,
            goals: formData.goals,
            smsAgreement: formData.smsAgreement,
            webcamAgreement: formData.webcamAgreement
        });

        toast.success(response.data.message);
        setTimeout(() => navigate("/checkout"), 2000);
    } catch (error) {
        toast.error(error.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-24">
      <Toaster position="top-right" />
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register Before Checkout</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Name of Adult *</label>
            <input
              type="text"
              name="adultName" // ✅ Match backend field name
              value={formData.adultName}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Number of Students *</label>
            <input
              type="number"
              name="numStudents"
              value={formData.numStudents}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">Name of Student(s) *</label>
            <textarea
              name="studentNames"
              value={formData.studentNames}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter student names"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Grade of Student(s) *</label>
            <input
              type="text"
              name="studentGrades"
              value={formData.studentGrades}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter grades"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Level of Math for Student(s) *</label>
            <input
              type="text"
              name="studentMathLevels"
              value={formData.studentMathLevels}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter math levels"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email for Billing *</label>
            <input
              type="email"
              name="billingEmail"
              value={formData.billingEmail}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter billing email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email(s) for Scheduling *</label>
            <input
              type="email"
              name="schedulingEmails"
              value={formData.schedulingEmails}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter scheduling emails"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">Phone Number *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">Tell me about your goals and expectations</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="What do you want to achieve?"
            ></textarea>
          </div>

          <div className="col-span-2 flex items-center">
            <input type="checkbox" name="smsAgreement" checked={formData.smsAgreement} onChange={handleChange} />
            <label className="ml-2 text-gray-700 text-sm">I agree to receive SMS notifications</label>
          </div>

          <button type="submit" className="col-span-2 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg">
            Continue to Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterBeforeCheckout;
