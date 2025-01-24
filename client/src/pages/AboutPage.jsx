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
            <div className="bg-gray-50 py-12 px-6 md:px-12 text-3xl">
                <h2 className="text-[#5D5D5E] text-2xl font-semibold text-center">
                    The Way Learning Math Should Be…
                </h2>
                <p className="text-steelGray mt-4 text-xl text-center">
                    I started Calcworkshop 10 years ago with a simple but powerful idea: give students of all ages the easiest to follow and most understandable math courses imaginable. After attending too many college and graduate math classes that left me dazed and confused by unexplained theorems and missing steps, I knew there had to be a better way.
                </p>
            </div>

            <div className="flex flex-col justify-center items-center py-5 bg-lightGray">
                <h2 className='text-black text-2xl font-bold text-center'>That’s why I…</h2>
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                    {aboutItems.map((item, index) => (
                        <div key={index} className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-80 md:w-96">
                            <div className="h-56 m-2.5 overflow-hidden rounded-md">
                                <img src={item.image} alt="card-image" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                                    {item.title}
                                </h6>
                                <p className="text-slate-600 leading-normal font-light">
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

            <div className="flex flex-wrap justify-center bg-lightGray py-10">
                <h2 className="text-steelGray text-center text-3xl font-bold w-full">A few vital statistics about Jenn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center gap-5">
                            <span className="p-10 font-bold border text-4xl border-black rounded-full w-24 h-24 flex items-center justify-center">{stat.number}</span>
                            <span className="text-steelGray text-lg font-bold max-w-[320px] text-center">{stat.text}</span>
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

            <div className="flex flex-wrap justify-center py-10">
                <h2 className="text-steelGray text-center text-3xl font-bold w-full"> Join over 32,000 other students achieving success in their math courses </h2>
                <h2 className="text-steelGray text-center text-2xl font-medium max-w-4xl mt-5">  Whether you’re learning it for the first time or simply want a refresher, you’ll find all the tools you need to reach the top of your class with RockstarMath. </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {additionalInfo.map((info, index) => (
                        <div key={index} className="flex flex-col items-center gap-5">
                            <div className="p-6 rounded-full flex items-center justify-center w-24 h-24">
                                {info.icon}
                            </div>
                            <span className="text-steelGray text-lg font-bold max-w-[320px] text-center">{info.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center py-20">
                <NavLink
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-4 rounded-full hover:bg-steelBlue-dark hover:scale-105 transition-all duration-300">
                    Join RockstarMath today
                </NavLink>
            </div>
        </>
    );
}

export default AboutPage;
