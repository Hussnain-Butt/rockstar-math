import React from 'react';
import AboutBanner from '../components/banners/AboutBanner';
import { FaVideo, FaCommentDots, FaLaptop, FaEnvelope } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function AboutPage() {
    const aboutItems = [
        { image: "/images/about1.png", title: "Take a step-by-step approach", description: "No more feeling lost in class. When you’re taught every step and how each one builds on the other, you’re never left scratching your head in confusion." },
        { image: "/images/about2.png", title: "Empower students to realize their", description: "Memorization only gets you so far. You’ll learn the why and the how behind calculus so you can problem solve on your own." },
        { image: "/images/about3.png", title: "Make the journey fun", description: "Learning math doesn’t have to be scary or stressful. You’ll enjoy your classes when you’re able to piece." }
    ];

    const stats = [
        { number: 15, text: "Years of experience as a certified calculus teacher" },
        { number: 1, text: "MA in Education from University of Virginia" },
        { number: 5, text: "Awards received for outstanding teaching" },
        { number: 50, text: "Average number of questions Jenn answers by email from her students." },
        { number: 10, text: "Years married to husband and business partner, Brian" },
        { number: 4, text: "Years studying mathematics and playing soccer at Virginia Tech" },
        { number: 2, text: "Cats at home amusing Jenn on a daily basis" },
        { number: 20, text: "Countries Jenn’s students currently span" }
    ];

    const additionalInfo = [
        { icon: <FaVideo size={40} />, text: "More than 450 HD videos and tutorials" },
        { icon: <FaCommentDots size={40} />, text: "1000+ fully explained practice problems" },
        { icon: <FaLaptop size={40} />, text: "Practice Tests & Exams" },
        { icon: <FaEnvelope size={40} />, text: "Email support with questions answered" }
    ];

    return (
        <>
            <AboutBanner />
            <div className="bg-gray-50 py-12 px-6 md:px-12">
    {/* Section Container */}
    <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800">
            <span className="relative inline-block">
                <span className="absolute inset-0 bg-yellow-500 opacity-20 transform -skew-x-6 rounded-md"></span>
                <span className="relative z-10">The Way Learning Math Should Be…</span>
            </span>
        </h2>
        {/* Description */}
        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            I started Calcworkshop 10 years ago with a simple but powerful idea: give students of all ages the easiest to follow and most understandable math courses imaginable. After attending too many college and graduate math classes that left me dazed and confused by unexplained theorems and missing steps, I knew there had to be a better way.
        </p>
        {/* Highlighted Line */}
        <div className="mt-8 h-1 mx-auto bg-yellow-500 w-20 rounded-full"></div>
    </div>
</div>


<div className="flex flex-col justify-center items-center py-10 bg-gray-50">
    {/* Section Title */}
    <h2 className="text-3xl font-bold text-black text-center relative inline-block">
        <span className="relative z-10">That’s why I…</span>
        <span className="absolute inset-x-0 -bottom-1 h-1 bg-yellow-500 w-20 mx-auto rounded-full"></span>
    </h2>

    {/* Cards Container */}
    <div className="flex flex-wrap justify-center gap-8 mt-12">
        {aboutItems.map((item, index) => (
            <div
                key={index}
                className="flex flex-col bg-white shadow-md border border-gray-200 rounded-lg w-80 md:w-96 hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-2"
            >
                {/* Image Section */}
                <div className="h-56 m-3 overflow-hidden rounded-lg relative">
                    <img
                        src={item.image}
                        alt="card-image"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-yellow-500 opacity-10"></div>
                </div>

                {/* Text Section */}
                <div className="p-5">
                    <h6 className="mb-2 text-gray-800 text-xl font-semibold hover:text-yellow-500 transition duration-300">
                        {item.title}
                    </h6>
                    <p className="text-gray-600 leading-relaxed font-light">
                        {item.description}
                    </p>
                </div>
            </div>
        ))}
    </div>
</div>


            <div className="flex flex-col md:flex-row items-center justify-center py-12 bg-gray-50 md:px-12 px-4">
                <div className="w-full md:w-1/3 mb-6 md:mb-0 pr-0 md:pr-8">
                    <img src="/images/girlImage.png" alt="about-image" className="rounded-md" />
                </div>
                <div className="w-full md:w-1/2 self-start lg:mt-20">
                    <p className="text-steelGray font-bold text-2xl leading-relaxed">
                        A passion for making math understandable and helping my students reach their potential is at the core of everything we do at Calcworkshop.
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center bg-gray-50 py-14">
    {/* Section Title */}
    <h2 className="text-gray-800 text-center text-3xl font-bold relative">
        A few vital statistics about Jenn
        <span className="block mt-2 w-20 h-1 bg-yellow-500 mx-auto rounded-full"></span>
    </h2>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12 px-6 lg:px-20">
        {stats.map((stat, index) => (
            <div
                key={index}
                className="flex flex-col items-center text-center bg-white shadow-md border border-gray-200 rounded-lg py-8 px-6 hover:shadow-lg transition-shadow duration-300"
            >
                {/* Number Circle */}
                <span className="p-10 font-bold border text-4xl border-yellow-500 text-yellow-500 rounded-full w-24 h-24 flex items-center justify-center">
                    {stat.number}
                </span>
                {/* Description */}
                <span className="text-gray-600 text-lg font-medium mt-4">{stat.text}</span>
            </div>
        ))}
    </div>
</div>


            <div className="flex justify-center items-center bg-gray-50 py-12 px-6">
                <div className="text-center max-w-lg">
                    <h2 className="text-[#5D5D5E] text-2xl font-semibold">
                        Join over 32,000 other students achieving success in their math courses
                    </h2>
                    <p className="text-steelGray mt-4 text-lg">
                        Whether you’re learning it for the first time or simply want a refresher, you’ll find all the tools you need to reach the top of your class with RockstarMath.
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center py-14 bg-gray-50">
    {/* Title Section */}
    <h2 className="text-gray-800 text-center text-3xl font-bold">
        Join over <span className="text-yellow-500">32,000</span> other students achieving success in their math courses
    </h2>
    <p className="text-gray-600 text-center text-xl max-w-4xl mt-4 leading-relaxed">
        Whether you’re learning it for the first time or simply want a refresher, you’ll find all the tools you need to reach the top of your class with RockstarMath.
    </p>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-6 lg:px-20">
        {additionalInfo.map((info, index) => (
            <div
                key={index}
                className="flex flex-col items-center bg-white shadow-lg border border-gray-200 rounded-lg p-6 hover:shadow-xl transform transition-all duration-300"
            >
                {/* Icon Wrapper */}
                <div className="p-6 rounded-full bg-yellow-500 text-white flex items-center justify-center w-20 h-20 shadow-md mb-4">
                    {info.icon}
                </div>
                {/* Text Description */}
                <span className="text-gray-800 text-lg font-semibold text-center">
                    {info.text}
                </span>
            </div>
        ))}
    </div>
</div>

<div className="flex items-center justify-center py-20">
    <NavLink
        to="/signup"
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-700 hover:scale-105 transition-all duration-300 transform focus:ring-4 focus:ring-yellow-300 focus:outline-none">
        Join RockstarMath Today
    </NavLink>
</div>

        </>
    );
}

export default AboutPage;
