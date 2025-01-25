import React from "react";

const Calendar = () => {
    const schedule = [
        {
            time: "3-6 pm",
            sunday: "Individual Lessons",
            monday: "Individual Lessons",
            tuesday: "Individual Lessons",
            wednesday: "Individual Lessons",
        },
        {
            time: "7-8 pm",
            sunday: "Individual Lessons",
            monday: "Middle School Study Group",
            tuesday: "Algebra 1 Study Group",
            wednesday: "Middle School Study Group",
        },
        {
            time: "8-9 pm",
            sunday: "Common Core Drop In for Parents",
            monday: "Trigonometry and Precalculus",
            tuesday: "Calculus Drop In Group (1.5 hours)",
            wednesday: "Geometry Study Group",
        },
    ];

    return (
        <div className="calendar-container p-6 lg:px-20 lg:py-12  text-deepBlue">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-deepBlue">Calendar</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table-auto w-full border-black  rounded-lg">
                    <thead className="bg-deepBlue-light text-deepBlue border-b border-yellow-400">
                        <tr>
                            <th className="text-xl font-bold px-6 py-4 text-center">Time (PST)</th>
                            <th className="text-xl font-bold px-6 py-4 text-center">Sunday</th>
                            <th className="text-xl font-bold px-6 py-4 text-center">Monday</th>
                            <th className="text-xl font-bold px-6 py-4 text-center">Tuesday</th>
                            <th className="text-xl font-bold px-6 py-4 text-center">Wednesday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-deepBlue-dark" : ""
                                } hover:border-l-4 hover:border-yellow-400 transition-all`}
                            >
                                <td className="text-lg px-6 py-4 text-center border-b border-yellow-400">
                                    {item.time}
                                </td>
                                <td className="text-lg px-6 py-4 text-center border-b border-yellow-400">
                                    {item.sunday}
                                </td>
                                <td className="text-lg px-6 py-4 text-center border-b border-yellow-400">
                                    {item.monday}
                                </td>
                                <td className="text-lg px-6 py-4 text-center border-b border-yellow-400">
                                    {item.tuesday}
                                </td>
                                <td className="text-lg px-6 py-4 text-center border-b border-yellow-400">
                                    {item.wednesday}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
