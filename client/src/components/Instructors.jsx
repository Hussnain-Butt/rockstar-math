import React from "react";

function Instructors() {
    // Sample data for instructors
    const instructors = [
        {
            img: "/images/teacher5.webp", // Replace with actual image URL
            name: "John Doe",
            position: "Mathematics Instructor",
            description: "John has over 10 years of experience teaching advanced mathematics.",
        },
        {
            img: "/images/teacher5.webp", // Replace with actual image URL
            name: "Jane Smith",
            position: "Physics Instructor",
            description: "Jane specializes in simplifying complex physics concepts for students.",
        },
        {
            img: "/images/teacher5.webp", // Replace with actual image URL
            name: "Mark Johnson",
            position: "Chemistry Instructor",
            description: "Mark is passionate about hands-on experiments and chemistry fundamentals.",
        },
    ];

    return (
        <div className="w-full py-12 px-4 md:px-10 lg:px-20 bg-gray-50">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900">Meet Your Instructors</h1>
                <p className="text-gray-600 mt-2">
                    Learn from the best in their fields and gain valuable knowledge.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {instructors.map((instructor, index) => (
                    <div
                        key={index}
                        className="rounded-lg shadow-lg bg-white overflow-hidden transform transition duration-300 hover:shadow-xl"
                    >
                        {/* Image Section */}
                        <div className="relative">
                            <img
                                src={instructor.img}
                                alt={instructor.name}
                                className="w-full h-64 object-cover"
                            />
                        </div>

                        {/* Instructor Details */}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{instructor.name}</h2>
                            <h3 className="text-yellow-500 italic mb-3">{instructor.position}</h3>
                            <p className="text-gray-600">{instructor.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Instructors;
