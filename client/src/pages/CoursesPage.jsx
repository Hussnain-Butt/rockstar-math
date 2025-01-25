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
          <div className="py-16 bg-gray-50">
    {/* Hero Section */}
    <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Introduction to Physics
        </h1>
        <h2 className="text-4xl font-semibold text-yellow-500 mt-4">
            Physics Made Easy
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            Learn physics essentials — Simplify complex topics — Empower your learning journey.
        </p>
    </div>

    {/* Courses Section */}
    <div className="flex flex-col gap-16 px-5 xl:px-20">
        {courses.map((course, index) => (
            <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-10 ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
            >
                {/* Content Section */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        {course.courseName}
                    </h2>
                    <ul className="list-disc pl-5 text-lg text-gray-700 space-y-3">
                        {course.points.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                    <button className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                        See More
                    </button>
                </div>

                {/* Video Section */}
                <div className="flex-1 relative shadow-lg rounded-lg overflow-hidden h-[330px]">
                    <img
                        src={course.thumbnailUrl}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 p-4 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform"
                        onClick={() => openModal(course.videoUrl)}
                    >
                        <IoMdPlay className="text-white text-4xl" />
                    </div>
                </div>
            </div>
        ))}
    </div>

    {/* Modal Section */}
    {isModalOpen && (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40"
            onClick={closeModalOnBackdrop}
        >
            <div className="rounded-xl max-w-4xl w-full relative bg-white shadow-lg">
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
            className="fixed top-4 right-4 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all z-50"
        >
            <IoMdClose className="text-xl" />
        </button>
    )}
</div>


        </>
    );
}

export default CoursesPage;
