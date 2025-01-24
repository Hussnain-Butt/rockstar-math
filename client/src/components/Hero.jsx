import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <>
            <div className="flex flex-col lg:flex-row px-14 xl:px-36 bg-deepBlue w-screen py-20">
                {/* Text */}
                <div className="flex flex-col uppercase lg:w-1/2">
                    <span className="font-bold text-steelBlue text-2xl -ml-5 mb-5">start to success</span>
                    <div className="capitalize text-[44px] xl:text-[52px] leading-[62px] font-black text-white">
                        <span>ace math with easy </span>
                        <span className="text-steelBlue">step-by-</span>
                        <span className="text-steelBlue">step courses</span>
                        <span> - no more </span>
                        <br className="sm:block hidden" />
                        <span> mystery, </span>
                        <span className="text-steelBlue">just results!</span>
                    </div>
                    <div className="text-lightGray mt-10 normal-case ">
                        Master math with our simple, guided courses designed to take the confusion out of learning. Whether you're a beginner or need a refresher, our lessons make it easy to grasp concepts and achieve results.
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-5 sm:flex-row mt-10">
                        <Link to='https://www.youtube.com/watch?v=aYH6CCTiqVY' target='_blank' className="px-8 py-3 border border-white text-white font-semibold rounded-full transition duration-500 ease-in-out hover:bg-steelBlue hover:text-white hover:border-steelBlue ">
                            See Demo Lectures
                        </Link>
                        <button className="px-8 py-3  bg-steelBlue border border-transparent text-white font-semibold rounded-full transition duration-500 ease-in-out hover:bg-transparent hover:border-white ml-0">
                            Enroll Now
                        </button>
                    </div>
                </div>

                {/* Image */}
                <div className="flex items-start justify-center lg:justify-end mt-10 lg:mt-0 lg:w-1/2">
                    <img src="/images/hero.png" alt="girl holding a book" />
                </div>
            </div>
        </>
    );
}

export default Hero;
