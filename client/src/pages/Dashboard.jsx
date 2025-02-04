import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar'
import ClassCard from '../components/ClassCard.jsx'
import Header from '../components/Header.jsx'

const Dashboard = () => {
  const user = { name: 'Jayla' }
  const [currentClasses, setCurrentClasses] = useState([]);
  const [nextScheduledClasses, setNextScheduledClasses] = useState([]); // ✅ Defined here

  useEffect(() => {
    // Simulate fetching data from API
    const fetchClasses = async () => {
      try {
        // Mock data - Replace this with actual API call
        const currentData = [
          { id: 1, title: "Algebra I & II", teacher: "Lana Steiner", date: "18 Jan 2022", image: "/images/course1.png", description: "The rise of RESTful APIs has been met by rise in tools for creating, testing." },
          { id: 2, title: "Math Class", teacher: "Lana Steiner", date: "18 Jan 2022", image: "/images/course2.png", description: "The rise of RESTful APIs has been met by rise in tools for creating, testing." },
          { id: 2, title: "Math Class", teacher: "Lana Steiner", date: "18 Jan 2022", image: "/images/course3.png", description: "The rise of RESTful APIs has been met by rise in tools for creating, testing." },
        
        ];
        
        const nextData = [
          { id: 3, title: "Algebra I & II", teacher: "Lana Steiner", date: "10/25/24", image: "/images/course4.png", description: "The rise of RESTful APIs has been met by rise in tools for creating, testing." },
          { id: 4, title: "Math Class", teacher: "Lana Steiner", date: "10/25/24", image: "/images/course5.png", description: "The rise of RESTful APIs has been met by rise in tools for creating, testing." },
          
          { id: 4, title: "Math Class", teacher: "Lana Steiner", date: "10/25/24", image: "/images/course6.png", description: "The rise of RESTful APIs has been met by rise in tools for creating, testing." },
        ];

        setCurrentClasses(currentData);
        setNextScheduledClasses(nextData); // ✅ Now it's defined
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);


  return (
    <div className="flex min-h-auto">
      <div className="flex-grow p-6 bg-gray-100 ">
      
        <div className="py-10">
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Here are your current classes:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentClasses.map((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Next Scheduled Class: 10/25/24</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nextScheduledClasses.map((cls) => ( // ✅ No error now
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>
      </section>
    </div>
      </div>
    </div>
  )
}

export default Dashboard
