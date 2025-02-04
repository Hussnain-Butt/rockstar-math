import React from 'react'
import AboutBanner from '../components/banners/AboutBanner'
import { FaVideo, FaCommentDots, FaLaptop, FaEnvelope } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function AboutPage() {
  const aboutItems = [
    {
      image: '/images/about1.png',
      title: 'The Language of Math',
      description: "Do you know how to read 3x +4(x+2) outloud? It is okay, most people don't.Math is a language, and your teacher is speaking it. You should too.",
      // content: "Detailed content for step-by-step approach."
    },
    {
      image: '/images/about2.png',
      title: 'The Reasoning to each step ',
      description:
        "Often I would ask my students why they took the step they did and they would immediately think they made a mistake.  We are trained in school to get to the right answer. The real goal is to understand why we are taking each step when we solve a problem",
      // content: "Detailed content for empowering students."
    },
    {
      image: '/images/about3.png',
      title: 'How to Learn Math ',
      description:
        "I can write a paper the night before it is due I have heard so many students claim.  This mindset is applied to math when people cram before an exam.  You wouldn't learn your lines the night before a play, or a sport the night before a game.  Math is a skill like sports and music and I provide my students with coaching on how to train their brain.",
      // content: "Detailed content for making the journey fun.
    },
  ]

  const stats = [
    { number: 5, text: 'years of teaching at CSU campuses.' },
    { number: 20, text: 'years of tutoring 1-1' },
    { number: '10,000', text: 'hours of teaching/tutoring' },
    { number: 2  + '+', text: 'degrees Taught at 3 different colleges' },
    { number: 2 , text: 'Homeschooling 2 Kids For 2 Years' },
    { number: 1 , text: 'Patent Pending For Algorithm' },
    { number: 30 , text: 'Years Video Games & Skateboarding' },
    { number: 3 , text: 'Years As A Research Scientist' },
  ]

  const additionalInfo = [
    { icon: <FaVideo size={40} />, text: 'Private Tutoring' },
    { icon: <FaCommentDots size={40} />, text: 'Group Tutoring' },
    { icon: <FaLaptop size={40} />, text: 'Digital Courses ' },
    { icon: <FaEnvelope size={40} />, text: 'Live Courses' },
  ]

  return (
    <>
      <AboutBanner />
      <div className="bg-gray-50 py-12 px-6 md:px-12">
        {/* Section Container */}
        <div className="max-w-6xl mx-auto text-left">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800">
            <span className="relative inline-block">
              <span className="absolute inset-0 transform -skew-x-6 rounded-md"></span>
              <span className="relative z-10">The Way Learning Math Should Be…</span>
            </span>
          </h2>
          {/* Description */}
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            I started RockstarMath 10 years ago with a simple but powerful idea: give students of
            all ages the easiest to follow and most understandable math courses imaginable. After
            attending too many college and graduate math classes that left me dazed and confused by
            unexplained theorems and missing steps, I knew there had to be a better way.
          </p>
          {/* Highlighted Line */}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-10 bg-gray-50">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-black text-center relative inline-block">
          <span className="relative z-10">That’s why I…</span>
        </h2>

        {/* Cards Container */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {aboutItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-white shadow-md border border-gray-200 rounded-lg w-80 md:w-96 hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="h-56 m-3 overflow-hidden rounded-lg relative">
                <img src={item.image} alt="card-image" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-deepBlue opacity-10"></div>
              </div>

              {/* Text Section */}
              <div className="p-5">
                <h6 className="mb-2 text-gray-800 text-xl font-semibold hover:text-debg-deepBlue transition duration-300">
                  {item.title}
                </h6>
                <p className="text-gray-600 leading-relaxed font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center py-12 bg-gray-50 md:px-12 px-4">
        <div className="w-full md:w-1/3 mb-6 md:mb-0 pr-0 md:pr-8">
          <img src="/images/girlImage.png" alt="about-image" className="rounded-md" />
        </div>
        <div className="w-full md:w-1/2 self-start lg:mt-20">
          <p className="text-steelGray font-bold text-2xl leading-relaxed">
          A passion for building strong foundations in math and helping each student stay on path and learn the math they need to reach their dreams is the core of what we do at RockstarMath.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center bg-gray-50 py-14">
        {/* Section Title */}
        <h2 className="text-gray-800 text-center text-3xl font-bold relative">
          A few vital statistics about Amy
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12 px-6 lg:px-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center  py-8 px-6  transition-shadow duration-300"
            >
              {/* Number Circle */}
              <span className="p-16 font-bold border text-4xl border-debg-deepBlue text-debg-deepBlue rounded-full w-24 h-24 flex items-center justify-center">
                {stat.number}
              </span>
              {/* Description */}
              <span className="text-gray-600 text-lg font-medium mt-4">{stat.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center bg-gray-50 py-12 ">
        <div className="text-center max-w-2xl">
          <h2 className="text-[#5D5D5E] text-2xl font-semibold">
          Top students don’t wait until they’re behind—they stay ahead with weekly math tutoring from day one. 
          </h2>
          <p className="text-steelGray mt-4 text-lg">
          They invest in their success, ensuring they’re always prepared and confident. Now, you can do the same with Rockstar Math—offering affordable group rates and discounts on private tutoring from a high-quality tutor. Get the support you need to excel all year long—without the high price tag.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center py-14 bg-gray-50">
        {/* Title Section */}
        <h2 className="text-gray-800 text-center text-3xl font-bold">
          Join over <span className="text-debg-deepBlue">32,000</span> other students achieving
          success in their math courses
        </h2>
        <p className="text-gray-600 text-center text-xl max-w-4xl mt-4 leading-relaxed">
          Whether you’re learning it for the first time or simply want a refresher, you’ll find all
          the tools you need to reach the top of your class with RockstarMath.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-6 lg:px-20">
          {additionalInfo.map((info, index) => (
            <div
              key={index}
              className="flex flex-col items-center   rounded-lg p-6  transform transition-all duration-300"
            >
              {/* Icon Wrapper */}
              <div className="p-6 rounded-full bg-deepBlue text-white flex items-center justify-center w-20 h-20 shadow-md mb-4">
                {info.icon}
              </div>
              {/* Text Description */}
              <span className="text-gray-800 text-lg font-semibold text-center">{info.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center py-20">
        <NavLink
          to="/signup"
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:from-debg-deepBlue hover:to-yellow-700 hover:scale-105 transition-all duration-300 transform focus:ring-4 focus:ring-yellow-300 focus:outline-none"
        >
          Join RockstarMath Today
        </NavLink>
      </div>
    </>
  )
}

export default AboutPage
