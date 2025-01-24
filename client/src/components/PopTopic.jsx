import React, { useState } from "react";
import { IoMdStar, IoMdClose, IoMdPlay } from "react-icons/io";

function PopTopic() {
    // State to handle modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");

    // Sample data
    const topics = [
        {
            title: "Algebra I & II",
            thumbnail: "/images/teacher1.png",
            videoUrl: "/videos/video.mp4",
            description: "Build a solid foundation in algebra with lessons for beginners.",
            rating: 4.8,
        },
        {
            title: "Calculus Basics",
            thumbnail: "/images/teacher2.png",
            videoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_3840_2160_30fps.mp4",
            description: "Learn the fundamental concepts of calculus.",
            rating: 4.9,
        },
        {
            title: "Algebra I & II",
            thumbnail: "/images/teacher3.png",
            videoUrl: "/videos/video.mp4",
            description: "Build a solid foundation in algebra with lessons for beginners.",
            rating: 4.8,
        },
        {
            title: "Calculus Basics",
            thumbnail: "/images/teacher4.png",
            videoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_3840_2160_30fps.mp4",
            description: "Learn the fundamental concepts of calculus.",
            rating: 4.9,
        },
        {
            title: "Algebra I & II",
            thumbnail: "/images/teacher1.png",
            videoUrl: "/videos/video.mp4",
            description: "Build a solid foundation in algebra with lessons for beginners.",
            rating: 4.8,
        },
        {
            title: "Calculus Basics",
            thumbnail: "/images/teacher2.png",
            videoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_3840_2160_30fps.mp4",
            description: "Learn the fundamental concepts of calculus.",
            rating: 4.9,
        },
        {
            title: "Algebra I & II",
            thumbnail: "/images/teacher3.png",
            videoUrl: "/videos/video.mp4",
            description: "Build a solid foundation in algebra with lessons for beginners.",
            rating: 4.8,
        },
        {
            title: "Calculus Basics",
            thumbnail: "/images/teacher4.png",
            videoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_3840_2160_30fps.mp4",
            description: "Learn the fundamental concepts of calculus.",
            rating: 4.9,
        },
    ];

    // Open video modal
    const openModal = (videoUrl) => {
        setCurrentVideo(videoUrl);
        setIsModalOpen(true);
    };

    // Close video modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentVideo("");
    };

    // Close modal when clicking on the backdrop
    const closeModalOnBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="w-full py-10 px-2 lg:px-28">
            <div className="w-full">
                <div className="flex justify-start items-center capitalize py-1 mb-4">
                    <h1 className="text-5xl font-bold">Most Popular Topics</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4">
                    {topics.map((topic, index) => (
                        <div
                            key={index}
                            className="w-full flex flex-col justify-between border border-gray-300 rounded-lg p-4 bg-gray-200 
                                       transform transition duration-300 hover:shadow-2xl hover:bg-gray-300"
                        >
                            <div className="mb-4 relative">
                                {/* Backdrop */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-35 rounded-xl"></div>
                                {/* Video thumbnail */}
                                <img
                                    src={topic.thumbnail}
                                    alt="Thumbnail"
                                    className="w-full border border-gray-300 rounded-xl mb-2"
                                />

                                {/* Play button icon with backdrop */}
                                <div
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                                 flex items-center justify-center p-4 rounded-full 
                                                 bg-opacity-60 bg-gray-700 transition-all ease-in-out 
                                                 duration-300 hover:bg-deepBlue hover:scale-105 hover:cursor-pointer"
                                    onClick={() => openModal(topic.videoUrl)} // Open modal on play button click
                                >
                                    <IoMdPlay className="text-white text-5xl transition-transform transform duration-300 
                                                         hover:text-steelBlue" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div>{topic.title}</div>
                                <div className="flex items-center">
                                    {topic.rating} <IoMdStar className="text-orange-500 ml-1" />
                                </div>
                            </div>

                            <div className="text-gray-600 mb-4">
                                <p>{topic.description}</p>
                            </div>

                            <div>
                                <button className="w-full py-2 bottom-0 rounded-full bg-steelBlue text-white transform transition duration-300 hover:scale-105 hover:opacity-80">
                                    Start Learning
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for video */}
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

            {/* Close button fixed on top right corner */}
            {isModalOpen && (
                <button
                    onClick={closeModal}
                    className="fixed top-4 right-4 text-white bg-steelBlue opacity-80 rounded-full p-3 cursor-pointer transition duration-300 
                            hover:opacity-100 hover:scale-110 hover:shadow-lg hover:cursor-pointer z-50"
                >
                    <IoMdClose className="text-2xl" />
                </button>
            )}
        </div>
    );
}

export default PopTopic;
