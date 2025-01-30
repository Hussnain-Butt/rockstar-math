import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RegisterBeforeCheckout = () => {
    const [formData, setFormData] = useState({
        name: "",
        numStudents: "",
        studentDetails: "",
        email: "",
        phone: "",
        goals: "",
        smsAgreement: false,
        webcamAgreement: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/checkout")
        // try {
        //     const response = await axios.post("http://localhost:5000/api/register/register", formData);
        //     toast.success(response.data.message);
        //     setTimeout(() => navigate("/checkout"), 2000);
        // } catch (error) {
        //     toast.error(error.response?.data?.error || "Registration failed.");
        // }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-36">
            <Toaster position="top-right" />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register Before Checkout</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Name */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium">Adult's Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Number of Students */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium">Number of Students</label>
                        <input
                            type="number"
                            name="numStudents"
                            value={formData.numStudents}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter number of students"
                        />
                    </div>

                    {/* Student Details */}
                    <div className="relative col-span-2">
                        <label className="block text-gray-700 font-medium">Student(s) Name, Grade & Math Level</label>
                        <textarea
                            name="studentDetails"
                            value={formData.studentDetails}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter details"
                        ></textarea>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium">Billing & Scheduling Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium">Parent's Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter phone number"
                        />
                    </div>

                    {/* Goals */}
                    <div className="relative col-span-2">
                        <label className="block text-gray-700 font-medium">Goals & Expectations</label>
                        <textarea
                            name="goals"
                            value={formData.goals}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="What do you want to achieve?"
                        ></textarea>
                    </div>

                    {/* Agreements */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="smsAgreement"
                            checked={formData.smsAgreement}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-gray-700 text-sm">I agree to receive SMS notifications</label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="webcamAgreement"
                            checked={formData.webcamAgreement}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-gray-700 text-sm">I agree to the webcam requirements</label>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Continue to Checkout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterBeforeCheckout;
