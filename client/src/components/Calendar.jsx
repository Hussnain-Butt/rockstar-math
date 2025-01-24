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
        <div className="calendar-container p-4 mx-8 lg:mx-20">
            <span className="font-bold text-3xl">Calendar</span>
            <div className="overflow-x-auto mt-10">
                <table className="table-auto w-full border border-black rounded-lg overflow-hidden">
                    <thead className="bg-transparent">
                        <tr>
                            <th className="border border-black text-2xl px-8 py-6 text-center font-bold">Time (PST)</th>
                            <th className="border border-black text-2xl px-8 py-6 text-center font-bold">Sunday</th>
                            <th className="border border-black text-2xl px-8 py-6 text-center font-bold">Monday</th>
                            <th className="border border-black text-2xl px-8 py-6 text-center font-bold">Tuesday</th>
                            <th className="border border-black text-2xl px-8 py-6 text-center font-bold">Wednesday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-black px-10 py-8 text-center">{item.time}</td>
                                <td className="border border-black px-10 py-8 text-center">{item.sunday}</td>
                                <td className="border border-black px-10 py-8 text-center">{item.monday}</td>
                                <td className="border border-black px-10 py-8 text-center">{item.tuesday}</td>
                                <td className="border border-black px-10 py-8 text-center">{item.wednesday}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
