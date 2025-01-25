import React from 'react';

function ReviewsBanner() {
    return (
        <div
        className="bg-cover bg-center py-40 relative"
        style={{ backgroundImage: `url(/images/reviewsBanner.png)` }}
    >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center justify-center text-center">
                {/* Heading */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-400 mb-6 leading-tight">
                    RockstarMath Reviews from Students Just Like You…
                </h2>
    
                {/* Subtext */}
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl">
                    RockstarMath has consistently received glowing reviews from students who have used its resources to
                    excel in their learning journey. Discover how students enhance their understanding of calculus and more!
                </p>
    
                {/* CTA Button */}
                <div className="mt-10">
                    <a
                        href=""
                        className="w-full   bg-yellow-400 text-gray-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-yellow-500 transition duration-300"
                    >
                        Enroll Now
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default ReviewsBanner;
