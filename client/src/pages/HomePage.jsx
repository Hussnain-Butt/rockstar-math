import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import PopTopic from '../components/PopTopic'
import RelatedCourses from '../components/RelatedCourses'
import Instructors from '../components/Instructors'
import Milestones from '../components/Milestones'
import Calendar from '../components/Calendar'
import StudentFeedback from '../components/StudentFeedback'
import JoinOurCommunity from '../components/JoinOurCommunity'
import Newsletter from './Newsletter'
import 'animate.css';

function HomePage() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setShowPopup(true); // ✅ Show popup after 4 seconds
      }, 4000);
    }, []);
  return (
    <>
      <div>
       
        {showPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full flex flex-col items-center my-20">
            {showPopup && <Newsletter onClose={() => setShowPopup(false)} />}
            </div>
          </div>
        )}
      </div>
      <Hero />
      <PopTopic />
      <RelatedCourses />
      <Instructors />
      <Milestones />
      <Calendar />
      <StudentFeedback />
      <JoinOurCommunity />
    </>
  )
}

export default HomePage
