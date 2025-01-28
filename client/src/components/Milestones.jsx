import React from "react";

function Milestones() {
    return (
        <div className="w-full py-14 px-6 lg:px-20 bg-gray-50">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="w-full text-center lg:text-left mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Amy’s / Rockstar Math Milestones
                    </h1>
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-12">
                    {/* Grid Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full lg:w-1/2">
                        <div className="milestone-item p-6  flex items-center gap-6 hover:shadow-lg transition-shadow">
                            <img
                                src="/images/mortarBoardGreen.png"
                                alt="Instructors Icon"
                                className="w-16 h-auto"
                            />
                            <div>
                                <p className="text-3xl font-bold text-gray-800">300</p>
                                <p className="text-gray-600">Instructors</p>
                            </div>
                        </div>
                        <div className="milestone-item p-6  flex items-center gap-6 hover:shadow-lg transition-shadow">
                            <img
                                src="/images/video.png"
                                alt="Videos Icon"
                                className="w-16 h-auto"
                            />
                            <div>
                                <p className="text-3xl font-bold text-gray-800">10,000+</p>
                                <p className="text-gray-600">Videos</p>
                            </div>
                        </div>
                        <div className="milestone-item p-6  flex items-center gap-6 hover:shadow-lg transition-shadow">
                            <img
                                src="/images/mortarBoardRed.png"
                                alt="Graduated Students Icon"
                                className="w-16 h-auto"
                            />
                            <div>
                                <p className="text-3xl font-bold text-gray-800">20,000+</p>
                                <p className="text-gray-600">Graduated Students</p>
                            </div>
                        </div>
                        <div className="milestone-item p-6  flex items-center gap-6 hover:shadow-lg transition-shadow">
                            <img
                                src="/images/students.png"
                                alt="Students Enrolled Icon"
                                className="w-16 h-auto"
                            />
                            <div>
                                <p className="text-3xl font-bold text-gray-800">1,000,000+</p>
                                <p className="text-gray-600">Students Enrolled</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            src="/images/amy.png"
                            alt="Milestone Image"
                            className="rounded-lg shadow-lg w-full max-w-[450px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Milestones;
