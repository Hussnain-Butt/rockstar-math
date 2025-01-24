import React from 'react'

function ContactForm() {
    return (
        <>
            {/* Split Section */}
            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-8 gap-6">
                {/* Image Section */}
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src="/images/girlImage.png"
                        alt="Sample"
                        className="w-full max-w-[500px] h-auto rounded-lg"
                    />
                </div>

                {/* Contact Form Section */}
                <div className="lg:w-1/2 flex flex-col p-8">
                    <h2 className="text-3xl font-bold text-gray-600 mb-6">Let’s Collaborate Now!</h2>

                    {/* Full Name Input */}
                    <label htmlFor="fullName" className="text-gray-600 text-sm mb-2">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-full border border-gray-300 p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deepBlue mb-4"
                    />

                    {/* Email Input */}
                    <label htmlFor="email" className="text-gray-600 text-sm mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-full border border-gray-300 p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deepBlue mb-4"
                    />

                    {/* Phone Number Input */}
                    <label htmlFor="phoneNumber" className="text-gray-600 text-sm mb-2">
                        Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full rounded-full border border-gray-300 p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deepBlue mb-4"
                    />

                    {/* Message Textarea */}
                    <label htmlFor="message" className="text-gray-600 text-sm mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        placeholder="Enter your message"
                        className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deepBlue mb-4"
                        rows="4"
                    ></textarea>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-steelblue text-white py-2 px-4 rounded-full text-sm font-medium bg-darkTeal focus:outline-none focus:ring-2 focus:ring-steelblue focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default ContactForm