import React, { useState } from 'react';
import { IoMdStar, IoMdPlay, IoMdClose } from 'react-icons/io';

function Reviews() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");

    const reviews = [
        {
            date: "March 10, 2024",
            stars: 5,
            profilePic: "/images/feedback_images/1.jpg",
            name: "John Doe",
            details: "As a student, my experience has been incredibly positive overall. The curriculum is well-structured and covers a wide range of mathematical topics, from basic algebra to advanced calculus. The instructors are knowledgeable and approachable, which makes it easy to ask questions and seek help whenever needed.",
            videoUrl: "/videos/video.mp4",
            position: "Math student",
            thumbnailUrl: "/images/teacher1.png"
        },
        {
            date: "March 15, 2024",
            stars: 4,
            profilePic: "/images/feedback_images/2.jpg",
            name: "Jane Smith",
            details: "As a student, my experience has been incredibly positive overall. The curriculum is well-structured and covers a wide range of mathematical topics, from basic algebra to advanced calculus. The instructors are knowledgeable and approachable, which makes it easy to ask questions and seek help whenever needed.",
            videoUrl: "/videos/video.mp4",
            position: "Math student",
            thumbnailUrl: "/images/teacher2.png"
        }
    ];

    const textOnlyReviews = [
        {
            date: "March 18, 2024",
            stars: 5,
            profilePic: "/images/feedback_images/3.jpg",
            name: "Alice Brown",
            details: "I found the teaching methods highly effective. The step-by-step approach to solving problems helped me gain confidence in mathematics. The support team is also very responsive.",
            position: "Physics student"
        },
        {
            date: "March 20, 2024",
            stars: 4,
            profilePic: "/images/feedback_images/4.jpg",
            name: "Bob White",
            details: "Great learning platform with a comprehensive curriculum. It helped me understand concepts that I struggled with before.",
            position: "Chemistry student"
        }
    ];

    const openModal = (videoUrl) => {
        setCurrentVideo(videoUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentVideo("");
    };

    const closeModalOnBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="py-10">
            <div className="font-bold text-3xl text-center mb-6">
                900+ Reviews on Shopper Approved | 150+ Reviews on Facebook
            </div>
            <p className="text-center text-2xl">
                Average 5-Star Rating
            </p>

            <div className="flex flex-wrap gap-8 mt-10 px-5 xl:px-20">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className={`w-full flex flex-col justify-between items-start rounded-lg overflow-hidden ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                        <div className="p-4 w-full md:w-1/2 ">
                            <div className="flex flex-col gap-1 mb-2">
                                <div className="text-gray-400 font-semibold text-sm mt-2">
                                    {review.date}
                                </div>
                                <div className="flex items-center">
                                    {Array.from({ length: review.stars }).map((_, i) => (
                                        <IoMdStar key={i} className="text-orange-500" />
                                    ))}
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <img
                                        src={review.profilePic}
                                        alt={`${review.name}'s profile`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="font-semibold">{review.name}</div>
                                </div>
                                <span className="text-gray-400 text-sm">{review.position}</span>
                            </div>
                            <div className="text-gray-600">
                                <p>{review.details}</p>
                            </div>
                        </div>

                        <div className={`${index % 2 === 0 ? "self-end" : "self-start"} sm:w-3/5 md:w-2/5 relative`}>
                            <div className="absolute  left-0 -top-1 md:-top-2 w-full h-full bg-gray-900 opacity-35 rounded-xl md:rounded-3xl"></div>
                            <img
                                src={review.thumbnailUrl}
                                alt="Thumbnail"
                                className="w-full h-full border border-gray-300 rounded-xl mb-2"
                            />

                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 rounded-full bg-opacity-60 bg-gray-700 transition-all ease-in-out duration-300 hover:bg-deepBlue hover:scale-105 hover:cursor-pointer"
                                onClick={() => openModal(review.videoUrl)}
                            >
                                <IoMdPlay className="text-white text-5xl transition-transform transform duration-300 hover:text-steelBlue" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 px-5 xl:px-20">
                <div className="flex flex-wrap gap-8">
                    {textOnlyReviews.map((review, index) => (
                        <div key={index} className="p-4 w-full">
                            <div className="flex flex-col gap-1 mb-2">
                                <div className="text-gray-400 font-semibold text-sm">
                                    {review.date}
                                </div>
                                <div className="flex items-center">
                                    {Array.from({ length: review.stars }).map((_, i) => (
                                        <IoMdStar key={i} className="text-orange-500" />
                                    ))}
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <img
                                        src={review.profilePic}
                                        alt={`${review.name}'s profile`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="font-semibold">{review.name}</div>
                                </div>
                                <span className="text-gray-400 text-sm">{review.position}</span>
                            </div>
                            <div className="text-gray-600">
                                <p>{review.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-40"
                    onClick={closeModalOnBackdrop}
                >
                    <div className="rounded-2xl mx-5 shadow-lg max-w-5xl w-full relative">
                        <video
                            src={currentVideo}
                            controls
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            )}

            {isModalOpen && (
                <button
                    onClick={closeModal}
                    className="fixed top-4 right-4 text-white bg-steelBlue opacity-80 rounded-full p-3 cursor-pointer transition duration-300 hover:opacity-100 hover:scale-110 hover:shadow-lg z-50"
                >
                    <IoMdClose className="text-2xl" />
                </button>
            )}
        </div>
    );
}

export default Reviews;
