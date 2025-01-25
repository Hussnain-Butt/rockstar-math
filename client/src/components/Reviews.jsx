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
        },
        {
            date: "March 20, 2024",
            stars: 4,
            profilePic: "/images/feedback_images/4.jpg",
            name: "Bob White",
            details: "Great learning platform with a comprehensive curriculum. It helped me understand concepts that I struggled with before.",
            position: "Chemistry student"
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
<div className="py-14 bg-gray-50">
    {/* Header Section */}
    <div className="text-center py-8 bg-gray-50">
    {/* Main Heading */}
    <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
        900+ Reviews on <span className="text-yellow-400">Shopper Approved</span> | 150+ Reviews on <span className="text-blue-500">Facebook</span>
    </h1>
    {/* Subheading */}
    <p className="mt-4 text-xl text-gray-600 font-medium">
        Average <span className="text-yellow-400">5-Star</span> Rating
    </p>
</div>

    {/* Reviews Section */}
    <div className="flex flex-wrap gap-8 justify-center px-5 xl:px-20">
        {reviews.map((review, index) => (
            <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
                {/* Image Section */}
                <div className="relative">
                    <img
                        src={review.thumbnailUrl}
                        alt="Review thumbnail"
                        className="w-full h-48 object-cover"
                    />
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 p-4 rounded-full shadow-md cursor-pointer transition-transform group-hover:scale-110"
                        onClick={() => openModal(review.videoUrl)}
                    >
                        <IoMdPlay className="text-white text-4xl" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="p-6">
                    <div className="text-sm text-gray-400">{review.date}</div>
                    <div className="flex items-center gap-2 my-2">
                        {Array.from({ length: review.stars }).map((_, i) => (
                            <IoMdStar key={i} className="text-yellow-400" />
                        ))}
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={review.profilePic}
                            alt={`${review.name}'s profile`}
                            className="w-14 h-14 rounded-full border-2 border-yellow-400"
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">{review.name}</h2>
                            <p className="text-sm text-gray-500">{review.position}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.details}</p>
                </div>
            </div>
        ))}
    </div>

    {/* Modal for Video Playback */}
    {isModalOpen && (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40"
            onClick={closeModalOnBackdrop}
        >
            <div className="rounded-lg shadow-lg max-w-4xl w-full relative">
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
            className="fixed top-4 right-4 bg-yellow-400 text-white p-3 rounded-full shadow-lg hover:bg-yellow-500 transition-all z-50"
        >
            <IoMdClose className="text-2xl" />
        </button>
    )}
</div>


    );
}

export default Reviews;
