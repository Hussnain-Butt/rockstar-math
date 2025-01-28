import React, { useState } from 'react';
import BlogBanner from '../components/banners/BlogBanner';
import { FaQuoteLeft } from "react-icons/fa";

function BlogPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const blogs = [
        {
            image: "/images/about1.png",
            title: "Take a step-by-step approach",
            description: "No more feeling lost in class. When you’re taught every step and how each one builds on the other, you’re never left scratching your head in confusion.",
            content: "Detailed content for step-by-step approach."
        },
        {
            image: "/images/about2.png",
            title: "Empower students to realize their",
            description: "Memorization only gets you so far. You’ll learn the why and the how behind calculus so you can problem solve on your own.",
            content: "Detailed content for empowering students."
        },
        {
            image: "/images/about3.png",
            title: "Make the journey fun",
            description: "Learning math doesn’t have to be scary or stressful. You’ll enjoy your classes when you’re able to piece.",
            content: "Detailed content for making the journey fun."
        },
        {
            image: "/images/about1.png",
            title: "Customized Learning Paths",
            description: "Tailor the learning experience to fit each student's unique needs.",
            content: "Detailed content for customized learning paths."
        },
        {
            image: "/images/about2.png",
            title: "Innovative Teaching Methods",
            description: "Discover new methods that engage students and promote active learning.",
            content: "Detailed content for innovative teaching methods."
        },
        {
            image: "/images/about3.png",
            title: "The Importance of Practice",
            description: "Learn why consistent practice is key to mastering any subject.",
            content: "Detailed content for the importance of practice."
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
