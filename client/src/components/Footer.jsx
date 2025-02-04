import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import SubscribeForm from "./SubscribeForm";
const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-8 lg:px-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 text-gray-800">
        {/* Column 1: Contact Us */}
        <div className="lg:col-span-2">
          <img src="/images/logo.png" alt="Company Logo" className="w-40 h-auto mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Call:{" "}
              <a
                href="tel:+15104104963"
                className="hover:underline hover:text-sky-600 transition"
              >
                (510) 410-4963
              </a>
            </p>
            <p>Serving the Bay Area</p>
            <p>
              Email:{" "}
              <a
                href="mailto:rockstarmathtutoring@gmail.com"
                className="hover:underline hover:text-sky-600 transition"
              >
                rockstarmathtutoring@gmail.com
              </a>
            </p>
          </div>
          <div className="flex mt-6 gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-600 transition text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-600 transition text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-600 transition text-xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Explore Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Reviews", "Courses", "Services", "Calendar", "FAQs", "Blogs", "About", "Contact", "Log in"].map(
              (link) => (
                <li key={link}>
                  <a
                    href="/"
                    className="hover:text-sky-600 hover:underline transition"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            {["Trigonometry", "Pre-Calculus", "Math Analysis", "Calculus 1", "Calculus 2", "Business Calculus"].map(
              (category) => (
                <li key={category}>
                  <a
                    href="/#"
                    className="hover:text-sky-600 hover:underline transition"
                  >
                    {category}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="lg:col-span-2 xl:pl-8">
        <SubscribeForm/>
        </div>
      </div>

      {/* Bottom Section for Mobile */}
      <div className="mt-10 text-center text-sm text-gray-600">
        © 2025 Rockstar Math. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
