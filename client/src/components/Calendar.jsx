import React, { useState } from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to get the days of the current month
  const getDaysInMonth = () => {
    const daysInMonth = [];
    const startOfMonth = currentDate.startOf("month").day();
    const daysInPrevMonth = currentDate.subtract(1, "month").daysInMonth();
    const daysInCurrentMonth = currentDate.daysInMonth();

    // Add days from the previous month to fill the grid
    for (let i = startOfMonth - 1; i >= 0; i--) {
      daysInMonth.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
      });
    }

    // Add days of the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      daysInMonth.push({
        day: i,
        currentMonth: true,
      });
    }

    // Add days from the next month to fill the grid
    while (daysInMonth.length % 7 !== 0) {
      daysInMonth.push({
        day: daysInMonth.length - daysInCurrentMonth - startOfMonth + 1,
        currentMonth: false,
      });
    }

    return daysInMonth;
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(currentDate.date(day));
    }
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = getDaysInMonth();

  return (
 <>
 <div className="py-16  ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Calendar</h2>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-lg font-medium text-gray-800">
          {currentDate.format("MMMM YYYY")}
        </span>
        <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 text-center text-gray-700">
        {daysInMonth.map(({ day, currentMonth }, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day, currentMonth)}
            className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
              currentMonth
                ? dayjs(selectedDate).isSame(currentDate.date(day), "day")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
                : "text-gray-400"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Time Selection */}
      <div className="flex justify-end items-center mt-4 space-x-2">
        <span className="text-gray-500">Time</span>
        <div className="px-3 py-1 border rounded-md text-gray-800 bg-gray-100">09:41</div>
        <button className="px-3 py-1 border rounded-md text-gray-800 bg-gray-100">AM</button>
        <button className="px-3 py-1 border rounded-md text-gray-800 bg-gray-100">PM</button>
      </div>
    </div>
    </div>
    </>
  );
};

export default Calendar;
