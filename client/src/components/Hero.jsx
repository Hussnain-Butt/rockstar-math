import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <>
<div className="flex flex-col lg:flex-row items-center md:px-14 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 w-full py-20 overflow-x-hidden relative">
  {/* Text Section */}
  <div className="flex flex-col text-center lg:text-left lg:w-1/2 space-y-6">
    <span className="font-bold text-yellow-300 text-lg tracking-wide uppercase">
      Start to Success
    </span>
    <h1 className="capitalize text-[30px] md:text-[44px] xl:text-[52px] leading-tight font-extrabold text-white">
      Ace Math With Easy <br />
      <span className="text-yellow-300">Step-By-Step Courses</span> - No More 
      Mystery, <span className="text-yellow-300">Just Results!</span>
    </h1>
    <p className="text-white/90 text-sm md:text-base leading-relaxed">
      Master math with our simple, guided courses designed to take the confusion out of
      learning. Whether you're a beginner or need a refresher, our lessons make it easy to
      grasp concepts and achieve results.
    </p>

    {/* Buttons */}
    <div className="flex items-center md:items-baseline gap-4 justify-center lg:justify-start">
      <Link
        to="https://www.youtube.com/watch?v=aYH6CCTiqVY"
        target="_blank"
        className="px-8 py-3 border border-yellow-300 text-yellow-300 font-semibold rounded-full transition duration-300 ease-in-out hover:bg-yellow-300 hover:text-indigo-600"
      >
        See Demo Lectures
      </Link>
      <button className="px-8 py-3 bg-yellow-300 text-indigo-600 font-semibold rounded-full transition duration-300 ease-in-out hover:bg-transparent hover:text-yellow-300 hover:border-yellow-300 border border-transparent">
        Enroll Now
      </button>
    </div>
  </div>

  {/* Image Section */}
  <div className="flex justify-center lg:justify-end mt-10 lg:mt-0 lg:w-1/2 relative">
    <div className="relative w-[300px] md:w-[400px] xl:w-[500px]">
      <img
        src="/images/hero.png"
        alt="girl with book"
        className=" w-full z-10"
      />
    </div>
 
  </div>
</div>




    </>
  )
}

export default Hero
