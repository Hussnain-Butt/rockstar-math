import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar'
import ClassCard from '../components/ClassCard.jsx'
import Header from '../components/Header.jsx'
import AnimatedSection from "../components/AnimatedSection.jsx";
import { useAuth } from '../context/AuthContext'; 
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: 'Guest', id: null };
  const [currentClasses, setCurrentClasses] = useState([]);

  const { users } = useAuth(); // ✅ Get user from context
  useEffect(() => {
    
    if (!users || !users._id) return; // ✅ Ensure user exists
  
    const fetchPurchasedClasses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${users._id}/purchased-classes`);
        const data = await response.json();
        console.log("Fetched Purchased Classes:", data.purchasedClasses); // ✅ Debugging
  
        if (response.ok && data.purchasedClasses) {
          setCurrentClasses(data.purchasedClasses);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
  
    fetchPurchasedClasses();
  }, [users]); // ✅ Runs when user changes
  
  

  return (
    <div className="flex min-h-auto">
      <div className="flex-grow bg-gray-100">
        <AnimatedSection direction="right">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Here are your purchased classes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentClasses.length > 0 ? (
                currentClasses.map((cls) => <ClassCard key={cls.id} classData={cls} />)
              ) : (
                <p>No purchased classes yet.</p>
              )}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Dashboard;
