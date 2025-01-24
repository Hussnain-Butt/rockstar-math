import React from 'react'
import Hero from '../components/Hero'
import PopTopic from '../components/PopTopic'
import RelatedCourses from '../components/RelatedCourses'
import Instructors from '../components/Instructors'
import Milestones from '../components/Milestones'
import Calendar from '../components/Calendar'
import StudentFeedback from '../components/StudentFeedback'
import JoinOurCommunity from '../components/JoinOurCommunity'

function HomePage() {
    return (
        <>
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