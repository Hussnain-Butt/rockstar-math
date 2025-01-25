import React from 'react';

function FAQBanner() {
    return (
        <div className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <img
            src="/images/faq.jpg"
            alt="FAQ Banner"
            className="absolute w-full h-full object-cover"
        />
    
        {/* Darker Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black opacity-75"></div>
    
        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-md">
                Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl drop-shadow-md">
                Get all the answers to your questions about Rockstar Math and our services.
            </p>
        </div>
    </div>
    

    );
}

export default FAQBanner;
