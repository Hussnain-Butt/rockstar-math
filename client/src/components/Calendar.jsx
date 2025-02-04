import React, { useState } from "react";

const Calendar = () => {
  // 🛠 Event Data
  const eventData = {
    Monday: ["Group Tutoring - 4 PM", "Private Tutoring - 6 PM"],
    Tuesday: ["Live Class - 5 PM"],
    Wednesday: ["Group Tutoring - 3 PM", "AP Bootcamp - 7 PM"],
    Thursday: ["Private Tutoring - 5 PM"],
  };

  // 🛠 State for Tooltip Visibility
  const [hoveredDay, setHoveredDay] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-8 text-center rounded-lg py-28">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-16">
        📅 Interactive Calendar
      </h2>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.keys(eventData).map((day) => (
          <div
            key={day}
            className="relative bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 font-semibold px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200"
            onMouseEnter={() => setHoveredDay(day)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            {day}
            {hoveredDay === day && (
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm py-2 px-4 rounded-lg shadow-xl opacity-90 animate-fadeIn whitespace-nowrap">
                {eventData[day].map((event, index) => (
                  <div key={index} className="text-center">
                    {event}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend Section */}
      <div className="mt-10 flex flex-col items-center">
        <h3 className="text-2xl font-semibold mb-10 mt-10">Legend</h3>
        <div className="grid grid-cols-3 gap-14">
          <div className="flex items-center space-x-3">
            <span className="w-6 h-6 bg-blue-500 inline-block rounded-md shadow-md"></span>
            <span className="text-lg text-gray-700">Group Tutoring</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="w-6 h-6 bg-green-500 inline-block rounded-md shadow-md"></span>
            <span className="text-lg text-gray-700">Private Tutoring</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="w-6 h-6 bg-red-500 inline-block rounded-md shadow-md"></span>
            <span className="text-lg text-gray-700">Live Class</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
