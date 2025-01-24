import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function SignupPage() {
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex">
            <div className="hidden w-1/2 bg-white xl:flex">
                <img src="/images/login.png" alt="Signup Illustration" className="w-full" />
            </div>
            <div className="w-full lg:w-1/2 bg-white flex flex-col items-center mt-10 px-10 md:px-20 lg:px-48">
                <img src="/images/logo.png" alt="Logo" className="w-[280px] h-auto" />
                <h1 className="text-5xl font-bold text-black mb-2">Sign Up</h1>
                <p className="text-gray-600 mb-6">Create an account to get started!</p>

                <div className="mb-4 w-full">
                    <label className="block text-sm font-bold text-black mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 border border-gray-300 bg-gray2 rounded-lg outline-none"
                    />
                </div>

                <div className="mb-4 w-full">
                    <label className="block text-sm font-bold text-black mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder="Your phone number"
                        className="w-full px-4 py-2 border border-gray-300 bg-gray2 rounded-lg outline-none"
                    />
                </div>

                <div className="mb-4 w-full relative">
                    <label className="block text-sm font-bold text-black mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Create a password"
                        className="w-full px-4 py-2 border border-gray-300 bg-gray2 rounded-lg outline-none"
                    />
                    <div
                        className="absolute right-4 top-[55%] text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </div>
                </div>

                <div className="mb-4 w-full relative">
                    <label className="block text-sm font-bold text-black mb-2" htmlFor="confirm-password">
                        Confirm Password
                    </label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirm-password"
                        placeholder="Confirm your password"
                        className="w-full px-4 py-2 border border-gray-300 bg-gray2 rounded-lg outline-none"
                    />
                    <div
                        className="absolute right-4 top-[55%] text-gray-500 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </div>
                </div>

                <button className="w-full bg-steelBlue text-white py-2 rounded hover:opacity-85 transition-all duration-500">
                    Sign Up
                </button>

                <p className="mt-4 text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="#" className="text-blue-500">
                        Log in here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;
