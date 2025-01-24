import React from 'react';

function AboutBanner() {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat py-16 sm:py-20 px-6 sm:px-8 text-lightGray font-sans"
            style={{
                backgroundImage: `url('/images/aboutBanner.png')`,
            }}
        >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

            {/* Content */}
            <div className="relative max-w-4xl mx-auto text-center">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">The way learning should be ..</h3>
                <p className="text-lg sm:text-xl leading-relaxed">
                    Master math with our simple, guided courses designed to take the confusion out of learning. Whether you're a beginner or need a refresher, our lessons make it easy to grasp concepts and achieve results.
                </p>
            </div>
        </div>
    );
}

export default AboutBanner;
