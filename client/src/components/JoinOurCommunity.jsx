import React from 'react';

function JoinOurCommunity() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-12 gap-6 lg:gap-12">
                {/* First Div with Image */}
                <div className="col-span-12 lg:col-span-4 flex lg:justify-center">
                    <img
                        src="/images/classroom.png"
                        alt="Join Our Learning Community"
                        className="w-full max-w-xs sm:max-w-sm object-cover h-auto"
                    />
                </div>

                {/* Second Div with Text and Form */}
                <div className="col-span-12 lg:col-span-8 flex flex-col mt-5">
                    <h2 className="text-2xl lg:text-4xl font-bold leading-tight text-gray-800 text-left">
                        Join Our Learning Community
                    </h2>
                    <p className="mt-5 text-gray-600 text-left">
                        Stay ahead in your learning journey! Sign up to access exclusive courses, personalized recommendations, and special offers designed just for you.
                    </p>

                    {/* Subheading */}
                    <h3 className="mt-6 text-xl font-semibold text-gray-800 text-left ">
                        Why Subscribe?
                    </h3>

                    {/* Bullet Points */}
                    <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2 text-start ">
                        <li>Get notified about upcoming courses and webinars.</li>
                        <li>Unlock access to special discounts and premium content.</li>
                        <li>Receive personalized learning recommendations based on your interests.</li>
                    </ul>

                    {/* Input Field and Button */}
                    <div className="mt-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-bold text-black mb-2 text-start ">
                            Ready to Learn?
                        </label>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                            <input
                                type="email"
                                id="email"
                                className="border w-full max-w-md border-gray-600 px-3 py-2 rounded-full"
                                placeholder="Enter your email"
                            />
                            <button className="bg-steelBlue text-white px-4 py-2 hover:bg-opacity-90 transition-all duration-300 rounded-full text-sm w-full sm:w-auto">
                                Sign Up for Free
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinOurCommunity;
