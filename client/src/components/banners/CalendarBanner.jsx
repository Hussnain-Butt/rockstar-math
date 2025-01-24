import React from 'react';
import { Link } from 'react-router-dom';

function CalendarBanner() {
    return (
        <div className="bg-gray2 text-lightGray font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* Left Section: Text */}
                    <div className="lg:w-1/2 text-center lg:text-left text-black py-16 lg:py-24">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 leading-snug">
                            Your Personalized Calendar: Plan, Organize, and Track Events,
                            Meetings!
                        </h2>
                        <p className="text-[#2A2929]">
                            Stay on top of your schedule with our easy-to-use calendar. Organize events, meetings, and deadlines effortlessly. Keep track of important dates, set reminders, and plan ahead with a user-friendly interface designed to simplify your daily life.
                        </p>
                        <Link to='https://www.youtube.com/watch?v=aYH6CCTiqVY' target='_blank' >
                           <button className="mt-5 px-8 py-3 border border-black text-black font-semibold rounded-full transition duration-500 ease-in-out hover:bg-steelBlue hover:text-white hover:border-steelBlue">
                           See Demo Lectures
                           </button>
                        </Link>
                    </div>

                    {/* Right Section: Logo */}
                    <div className="lg:w-1/3 flex justify-center lg:justify-end">
                        <img src="/images/time.png" alt="Company Logo" className="w-full h-auto max-w-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalendarBanner;
