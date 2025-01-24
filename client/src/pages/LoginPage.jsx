import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function LoginPage() {
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex">
            <div className="hidden w-1/2 bg-white xl:flex">
                <img src="/images/login.png" alt="Logo" className="w-full" />
            </div>
            <div className="w-full lg:w-1/2 bg-white flex flex-col items-center mt-10 px-10 md:px-20 lg:px-48">
                <img src="/images/logo.png" alt="Logo" className="w-[280px] h-auto" />
                <h1 className="text-5xl font-bold text-black mb-2">Login</h1>
                <p className="text-gray-600 mb-6">Welcome back! Please log in to access your account.</p>

                <div className="mb-4 w-full ">
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

                <div className="mb-4 w-full relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Your password"
                        className="w-full px-4 py-2 border border-gray-300 bg-gray2 rounded-lg outline-none"
                    />
                    <div
                        className="absolute right-4 top-[55%] text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </div>
                </div>

                <div className="flex justify-between w-full mb-4">
                    <div className="flex items-center ">
                        <input type="checkbox" id="remember-me" className="h-4 w-4 mr-2 cursor-pointer" />
                        <label htmlFor="remember-me" className="text-sm text-gray-700 cursor-pointer">
                            Remember Me
                        </label>
                    </div>
                    <a href="#" className="text-sm text-blue-500">
                        Forgot Password?
                    </a>
                </div>

                <button className="w-full bg-steelBlue text-white py-2 rounded hover:opacity-85 transition-all duration-500 ">
                    Login
                </button>

                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-500">
                        Sign up now
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
