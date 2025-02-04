import React, { useEffect, useState } from 'react'
import ClassCard from '../components/ClassCard'
import { Link } from 'react-router-dom'

const MyClasses = () => {
  const [currentClasses, setCurrentClasses] = useState([])

  useEffect(() => {
    // Simulate fetching data from API
    const fetchClasses = async () => {
      try {
        // Mock data - Replace this with actual API call
        const currentData = [
          {
            id: 1,
            title: 'Algebra I & II',
            teacher: 'Lana Steiner',
            date: '18 Jan 2022',
            image: '/images/course1.png',
            description:
              'The rise of RESTful APIs has been met by rise in tools for creating, testing.',
          },
          {
            id: 2,
            title: 'Math Class',
            teacher: 'Lana Steiner',
            date: '18 Jan 2022',
            image: '/images/course2.png',
            description:
              'The rise of RESTful APIs has been met by rise in tools for creating, testing.',
          },
          {
            id: 2,
            title: 'Math Class',
            teacher: 'Lana Steiner',
            date: '18 Jan 2022',
            image: '/images/course3.png',
            description:
              'The rise of RESTful APIs has been met by rise in tools for creating, testing.',
          },
        ]

        setCurrentClasses(currentData)
      } catch (error) {
        console.error('Error fetching classes:', error)
      }
    }

    fetchClasses()
  }, [])
  return (
    <section>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Here are your current classes:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClasses.map((cls) => (
          <ClassCard key={cls.id} classData={cls} />
        ))}
      </div>
      <div className='flex justify-center items-center py-16'>
      <Link to={'/services'} className='bg-deepBlue py-3 px-8 text-white rounded-full hover:bg-sky-600'>Purchase More Courses</Link>
      </div>
    </section>
  )
}

export default MyClasses
