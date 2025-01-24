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

            <div className="flex flex-col md:flex-row px-10 md:px-32 py-10 md:py-20 gap-10 md:gap-20 justify-between">
                <div className="md:w-2/3 text-xl md:text-3xl text-gray-500 font-bold">
                    <h2>
                        A passion for making math understandable and helping my students reach their potential is at the core of everything we do at Calcworkshop.
                    </h2>
                </div>
                <div className="md:w-1/3">
                    <img src="/images/blog2.png" alt="" className="w-full h-auto" />
                </div>
            </div>

            <div
                className="relative bg-cover bg-center bg-no-repeat py-16 sm:py-20 px-6 sm:px-8 text-lightGray font-sans"
                style={{
                    backgroundImage: `url(/images/blog3.png)`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="flex flex-col gap-5 relative max-w-4xl text-gray-300 mx-auto text-center">
                    <div className="flex w-full justify-center items-center">
                        <FaQuoteLeft className='text-7xl' />
                    </div>
                    <p className="text-lg sm:text-2xl leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque felis vitae tortor augue. Velit nascetur Consequat faucibus porttitor enim et.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-5 py-5 xl:px-20 2xl:px-36 place-items-center">
                <h2 className='text-steelGray text-2xl font-bold text-center col-span-full'>Our Blogs</h2>
                {blogs.map((item, index) => (
                    <div key={index}
                        className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-full md:w-96 cursor-pointer hover:shadow-lg transform transition-transform duration-300 ease-in-out"
                        onClick={() => handleOpenModal(item)}>
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

            {modalOpen && selectedBlog && (
                <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black bg-opacity-75" onClick={handleBackdropClick}>
                    <div className={`relative bg-white rounded-lg w-[90vw] mx-4 md:mx-0 ${modalOpen ? 'fade-in' : 'fade-out'}`}>
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 bg-steelBlue p-2 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex divide-x divide-gray-200">
                            <div className="w-1/2 p-6">
                                <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-auto rounded-md mb-4" />
                            </div>
                            <div className="w-1/2 p-6">
                                <h3 className="text-xl font-semibold mb-2">{selectedBlog.title}</h3>
                                <p>{selectedBlog.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .fade-in {
                    animation: fadeIn 500ms ease-in-out;
                }
                .fade-out {
                    animation: fadeOut 500ms ease-in-out;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                }
            `}</style>
        </>
    );
}

export default BlogPage;
