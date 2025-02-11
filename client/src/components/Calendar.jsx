import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";

const Calendar = () => {
  // 🛠 Event Data
  const eventData = {
    Sunday: ["Individual Lessons - 3 - 6 pm", "Common Core Drop In for Parents - 8 - 9 pm"],
    Monday: ["Group Tutoring - 4 PM", "Private Tutoring - 6 PM"],
    Tuesday: ["Live Class - 5 PM"],
    Wednesday: ["Group Tutoring - 3 PM", "AP Bootcamp - 7 PM"],
    Thursday: ["Private Tutoring - 5 PM"],
  };

  // 🛠 Define Different Background Colors for Each Day
  const bgColors = {
    Sunday: "bg-green-500 hover:bg-green-600 text-white",
    Monday: "bg-blue-500 hover:bg-blue-600 text-white",
    Tuesday: "bg-red-500 hover:bg-red-600 text-white",
    Wednesday: "bg-blue-500 hover:bg-blue-600 text-white",
    Thursday: "bg-green-500 hover:bg-green-600 text-white",
  };

  // 🛠 State for Tooltip Visibility
  const [hoveredDay, setHoveredDay] = useState(null);

  return (
    <AnimatedSection direction="top">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <span role="img" aria-label="calendar">📅</span> Interactive Calendar
          </h2>
          <p className="text-gray-600 mt-2 text-lg">Plan your learning schedule with ease!</p>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center">
          {Object.keys(eventData).map((day) => (
            <div
              key={day}
              className={`relative py-6 px-5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-300 font-semibold text-lg ${bgColors[day]} text-white`}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <span className="block text-xl font-bold">{day}</span>
              {hoveredDay === day && (
                <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm py-3 px-5 rounded-lg shadow-xl opacity-90 animate-fadeIn whitespace-nowrap z-10">
                  <ul className="list-disc list-inside">
                    {eventData[day].map((event, index) => (
                      <li key={index} className="text-center">{event}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Calendar;
