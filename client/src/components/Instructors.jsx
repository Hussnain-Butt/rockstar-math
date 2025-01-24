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
        <div className="w-full py-10 px-4 lg:px-28">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">Meet Your Instructors</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructors.map((instructor, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg p-4 bg-gray-200 transform transition duration-300 hover:shadow-lg"
                    >
                        <div className="mb-4">
                            <img
                                src={instructor.img}
                                alt={instructor.name}
                                className="w-full h-80 object-cover rounded-lg"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{instructor.name}</h2>
                            <h3 className="text-gray-600 italic mb-2">{instructor.position}</h3>
                            <p className="text-gray-700">{instructor.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Instructors;
