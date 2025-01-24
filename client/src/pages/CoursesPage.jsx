import React, { useState } from 'react';
import { IoMdPlay, IoMdClose } from 'react-icons/io';

function CoursesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");

    const courses = [
        {
            courseName: "Mathematics Mastery",
            videoUrl: "/videos/video.mp4",
            thumbnailUrl: "/images/teacher1.png", // Correct usage
            points: [
                "Learn from basic algebra to advanced calculus.",
                "Expert instructors with years of experience.",
                "Interactive lessons with real-world applications.",
                "Practice tests to track your progress."
            ]
        },
        {
            courseName: "Physics for Beginners",
            videoUrl: "/videos/video.mp4",
            thumbnailUrl: "/images/teacher2.png", // Correct usage
            points: [
                "Simplified concepts for easy understanding.",
                "Hands-on experiments to solidify learning.",
                "Comprehensive coverage of Newtonian mechanics.",
                "Visual aids for enhanced grasp of topics."
            ]
        },
        {
            courseName: "Mathematics Mastery",
            videoUrl: "/videos/video.mp4",
            thumbnailUrl: "/images/teacher1.png", // Correct usage
            points: [
                "Learn from basic algebra to advanced calculus.",
                "Expert instructors with years of experience.",
                "Interactive lessons with real-world applications.",
                "Practice tests to track your progress."
            ]
        },
        {
            courseName: "Physics for Beginners",
            videoUrl: "/videos/video.mp4",
            thumbnailUrl: "/images/teacher2.png", // Correct usage
            points: [
                "Simplified concepts for easy understanding.",
                "Hands-on experiments to solidify learning.",
                "Comprehensive coverage of Newtonian mechanics.",
                "Visual aids for enhanced grasp of topics."
            ]
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
        <>
            <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-4xl">Introduction to Algebra</h1>
                <h2 className="font-medium text-5xl">Fundamentals Made Easy</h2>
                <p className="text-2xl">Learn algebraic essentials—Sharpen problem-solving skills—Empower your math journey.</p>
            </div>

            <div className="flex flex-col gap-10 px-20 py-20">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-20 md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse justify-between" : ""} items-center gap-6`}
                    >
                        {/* Thumbnail Section */}
                        <div className={`${index % 2 === 0 ? "self-end" : "self-start"} sm:w-3/5 md:w-4/12 relative`}>
                            <div className="absolute left-0 -top-1 w-full h-full bg-gray-900 opacity-35 rounded-xl md:rounded-3xl"></div>
                            <img
                                src={course.thumbnailUrl}
                                alt="Thumbnail"
                                className="w-full h-full border border-gray-300 rounded-xl mb-2"
                            />

                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 rounded-full bg-opacity-60 bg-gray-700 transition-all ease-in-out duration-300 hover:bg-deepBlue hover:scale-105 hover:cursor-pointer"
                                onClick={() => openModal(course.videoUrl)}
                            >
                                <IoMdPlay className="text-white text-5xl transition-transform transform duration-300 hover:text-steelBlue" />
                            </div>
                        </div>

                        {/* Course Details */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl font-semibold text-steelBlue mb-4">
                                {course.courseName}
                            </h2>
                            <ul className="list-disc list-inside text-2xl ml-5 text-black mb-4">
                                {course.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                            <button className="bg-steelBlue text-white px-4 py-3 rounded-md transition duration-300 hover:opacity-90">
                                See More
                            </button>
                        </div>
                    </div>
                ))}
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
                            autoPlay
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
        </>
    );
}

export default CoursesPage;
