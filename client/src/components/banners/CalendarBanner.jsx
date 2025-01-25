import React from 'react';
import { Link } from 'react-router-dom';

function CalendarBanner() {
    return (
        <div className="bg-blue-50 text-gray-800 font-sans py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left Section: Text */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        Your Personalized Calendar:
                        <br />
                        Plan, Organize, and Track Events, Meetings!
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Stay on top of your schedule with our easy-to-use calendar. Organize events, meetings, and deadlines effortlessly. Keep track of important dates, set reminders, and plan ahead with a user-friendly interface designed to simplify your daily life.
                    </p>
                    <Link to="https://www.youtube.com/watch?v=aYH6CCTiqVY" target="_blank">
                        <button className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-full shadow-md hover:bg-yellow-600 transition duration-300">
                            See Demo Lectures
                        </button>
                    </Link>
                </div>
    
                {/* Right Section: Illustration */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                    <img
                        src="/images/time.png"
                        alt="Calendar Illustration"
                        className="w-full max-w-md lg:max-w-lg h-auto"
                    />
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default CalendarBanner;
