import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8 sm:px-16">
            <div className="w-full grid justify-between gap-8 px-4 sm:px-6 text-gray-800 sm:grid-cols-2 2xl:grid-cols-6">
                {/* Column 1: Logo and Contact Us */}
                <div className="lg:col-span-2">
                    <img src="/images/logo.png" alt="Company Logo" className="w-80 h-auto mb-4" />
                    <span className="text-3xl font-bold">Contact Us</span>
                    <div className="text-base text-gray-600 mt-5 space-y-2">
                        <p>Call: <a href="tel:+15104104963" className="hover:underline">(510) 410-4963</a></p>
                        <p>Serving the Bay Area</p>
                        <p>Email: <a href="mailto:rockstarmathtutoring@gmail.com" className="hover:underline">rockstarmathtutoring@gmail.com</a></p>
                    </div>
                    <div className="flex mt-4 gap-4 text-gray-600">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-2xl hover:text-indigo-600 transition" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-2xl hover:text-indigo-600 transition" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-2xl hover:text-indigo-600 transition" />
                        </a>
                    </div>
                </div>
                {/* Explore Section */}
                <div>
                    <div className="text-3xl font-bold">Explore</div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {["Home", "Reviews", "Courses", "Calendar", "FAQs", "Blogs", "About", "Contact", "Log in"].map((link) => (
                            <a
                                key={link}
                                className="text-gray-700 text-base hover:text-indigo-500 hover:underline transition-all"
                                href="/#"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
                {/* Categories Section */}
                <div>
                    <div className="text-3xl font-bold">Categories</div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {["Trigonometry", "Pre-Calculus", "Math Analysis", "Calculus 1", "Calculus 2", "Business Calculus"].map((category) => (
                            <a
                                key={category}
                                className="text-gray-700 text-base hover:text-indigo-500 hover:underline transition-all"
                                href="/#"
                            >
                                {category}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Column 4: Subscribe */}
                <div className="lg:col-span-2 2xl:pl-16">
                    <div className="text-3xl font-bold">Subscribe</div>
                    <p className="my-3 text-gray-600"> Become a member today and get access to videos, study groups and discounts! </p>
                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full max-w-[400px] px-2 py-4 rounded-lg border border-none outline-none bg-lightGray"
                        />
                        <button className="max-w-[150px] rounded-lg bg-[#1D64C7] text-white p-2 text-xl hover:bg-opacity-80 transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
