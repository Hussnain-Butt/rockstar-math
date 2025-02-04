import React from 'react'

const Schedule = () => {
    const schedule = [
        {
          time: "3 - 6 pm",
          days: ["Individual Lessons", "Individual Lessons", "Individual Lessons", "Individual Lessons"],
        },
        {
          time: "7 - 8 pm",
          days: [
            "Individual Lessons",
            "Middle School Study Group",
            "Algebra I Study Group",
            "Middle School Study Group",
          ],
        },
        {
          time: "8 - 9 pm",
          days: [
            "Common Core Drop In for Parents",
            "Trigonometry and Precalculus",
            "Calculus Drop In Group (1.5 hours)",
            "Geometry Study Group",
          ],
        },
      ];
    
  return (
    <>
        <div className="max-w-full px-20 py-6">
    <h2 className="text-3xl font-bold mb-6 text-center">Calendar</h2>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border rounded-lg">
        <thead>
          <tr className="">
            <th className="border border-black p-5 text-left">Time (PST)</th>
            <th className="border border-black p-5 text-left">Sunday</th>
            <th className="border border-black p-5 text-left">Monday</th>
            <th className="border border-black p-5 text-left">Tuesday</th>
            <th className="border border-black p-5 text-left">Wednesday</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-black p-5 font-medium text-gray-700">
                {row.time}
              </td>
              {row.days.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className="border border-black p-5 text-gray-600"
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
    </>
  )
}

export default Schedule