import React, { useState } from 'react';
import BlogBanner from '../components/banners/BlogBanner';
import { FaQuoteLeft } from "react-icons/fa";

function BlogPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const blogs = [
        {
            image: "/images/about1.png",
            title: "Make Math a Daily Habit",
            description: "Incorporate 15 minutes of math practice into your child’s routine—just like brushing their teeth. Daily engagement reinforces existing skills and ensures consistency. Use flashcards for quick drills, play math-related games, or explore fun apps designed for math practice. Short, focused sessions work wonders in building long-term retention.",
            // content: "Detailed content for step-by-step approach."
        },
        {
            image: "/images/about2.png",
            title: "Review Old Skills Regularly",
            description: "It's common for children to forget concepts they learned months ago if they aren't revisited. Set aside time to review past lessons—whether it's multiplication, decimals, or word problems. Revisiting older material keeps these skills sharp and prevents gaps that can arise over time.",
            // content: "Detailed content for empowering students."
        },
        {
            image: "/images/about3.png",
            title: "Leverage Real-Life Math Opportunities",
            description: "Math is everywhere! Involve your children in activities like cooking (measuring ingredients), budgeting (managing an allowance), or grocery shopping (calculating discounts). These real-world applications make math engaging and help children understand its practical importance.",
            // content: "Detailed content for making the journey fun."
        },
        {
            image: "/images/about1.png",
            title: "Join STEM Enrichment Programs",
            description: "Many schools and community centers offer math clubs, robotics teams, and STEM workshops. These programs make math exciting and give children opportunities to work collaboratively, apply concepts, and explore advanced topics in a supportive environment.",
            // content: "Detailed content for customized learning paths."
        },
        {
            image: "/images/about2.png",
            title: "Celebrate Progress",
            description: "Acknowledge and celebrate milestones—whether it’s mastering multiplication tables or solving their first algebra equation. Positive reinforcement boosts confidence and keeps children motivated to tackle new challenges. Parents don’t need to be math experts to support their children. You can be a math enthusiast! Talk about how much math changes the world and opens doors in life! ! The key is fostering curiosity, building routines, and creating an environment where math is seen as a challenge to embrace, not a subject to fear. A solid foundation today paves the way for limitless opportunities tomorrow.",
            // content: "Detailed content for innovative teaching methods."
        },
      
    ];

    const handleOpenModal = (blog) => {
        setSelectedBlog(blog);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedBlog(null);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <>
            <BlogBanner />

            <div className="flex flex-col md:flex-row px-8 md:px-32 py-12 md:py-20 gap-12 md:gap-20 items-center bg-gray-50">
    {/* Left Text Section */}
    <div className="md:w-2/3 text-lg md:text-2xl text-gray-600 font-medium leading-relaxed">
        <h2>
            A passion for making math <span className="text-deebg-deepBlue">understandable</span> and helping my students 
            reach their <span className="text-deebg-deepBlue">potential</span> is at the core of everything we do at RockstarMath.
        </h2>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-[16px] px-6 py-2 rounded-full shadow-md transition duration-300">
                    See More
                </button>
    </div>

    {/* Right Image Section */}
    <div className="md:w-1/3">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img src="/images/blog2.png" alt="Blog" className="w-full h-auto object-cover" />
            {/* Yellow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-600 via-transparent to-transparent opacity-30"></div>
        </div>
    </div>
</div>


<div
    className="relative bg-cover bg-center bg-no-repeat py-20 px-6 sm:px-8 text-lightGray font-sans"
    style={{
        backgroundImage: `url(/images/blog3.png)`,
    }}
>
    {/* Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>

    {/* Content */}
    <div className="relative max-w-4xl mx-auto text-center text-gray-200">
        {/* Icon */}
        <div className="flex justify-center mb-6">
            <FaQuoteLeft className="text-6xl sm:text-7xl text-white" />
        </div>

        {/* Text */}
        <p className="text-lg sm:text-1xl leading-relaxed font-medium">
        RockstarMath is all about transforming challenges into achievements. We take pride in simplifying math and helping students discover their true potential through guided learning.
        </p>
        <br />
        <hr />
        <p className="text-lg sm:text-1xl leading-relaxed font-medium mt-5">
        Rockstar-Math
        </p>
    </div>
</div>


<div className="py-10 bg-gray-50">
    {/* Section Title */}
    <h2 className="text-gray-800 text-3xl font-bold text-center mb-10">
        <span className="border-b-4 border-deebg-deepBlue pb-1">Our Blogs</span>
    </h2>

    {/* Blog Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 xl:px-20">
        {blogs.map((item, index) => (
            <div
                key={index}
                className="flex flex-col bg-white shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                onClick={() => handleOpenModal(item)}
            >
                {/* Image Section */}
                <div className="h-56 overflow-hidden rounded-t-lg relative">
                    <img
                        src={item.image}
                        alt="Blog image"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-deepBlue bg-opacity-20 hover:bg-opacity-40 transition-all duration-300"></div>
                </div>
                {/* Content Section */}
                <div className="p-6">
                    <h6 className="mb-3 text-gray-800 text-xl font-semibold hover:text-deepBlue  transition-colors duration-300">
                        {item.title}
                    </h6>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        ))}
    </div>

    {/* Modal for Blog Details */}
    {modalOpen && selectedBlog && (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={handleBackdropClick}
        >
            <div className="relative bg-white rounded-lg w-[90vw] md:w-[70vw] lg:w-[60vw] overflow-hidden shadow-lg">
                {/* Close Button */}
                <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 bg-deepBlue text-white p-2 rounded-full shadow-md hover:bg-sky-600 transition-all focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Modal Content */}
                <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-1/2 h-64 lg:h-auto bg-gray-100">
                        <img
                            src={selectedBlog.image}
                            alt={selectedBlog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Text */}
                    <div className="lg:w-1/2 p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            {selectedBlog.title}
                        </h3>
                        <p className="text-gray-600">{selectedBlog.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )}
</div>



         
        </>
    );
}

export default BlogPage;
