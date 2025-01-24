import React from "react";
import { TbGeometry, TbMath, TbBusinessplan } from "react-icons/tb";
import { LuArrowUpRight } from "react-icons/lu";
import { BiAnalyse } from "react-icons/bi";
import { MdOutlineMultilineChart, MdOutlineBarChart } from "react-icons/md";
import { GiStairs } from "react-icons/gi";
import { FaSquareRootAlt } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { RiFunctionLine } from "react-icons/ri";

function RelatedCourses() {
  const courses = [
    { Icon: FaSquareRootAlt, title: "Algebra I & II", link: "https://youtube.com" },
    { Icon: TbGeometry, title: "Trigonometry (Pre-Calculus)", link: "https://youtube.com" },
    { Icon: BiAnalyse, title: "Math Analysis", link: "https://youtube.com" },
    { Icon: TbMath, title: "Math Analysis (Pre-Calculus)", link: "https://youtube.com" },
    { Icon: TbBusinessplan, title: "Business Calculus", link: "https://youtube.com" },
    { Icon: TbMath, title: "Calculus 1", link: "https://youtube.com" },
    { Icon: RiFunctionLine, title: "Calculus 2", link: "https://youtube.com" },
    { Icon: GiStairs, title: "Calculus 3 (Multivariable)", link: "https://youtube.com" },
    { Icon: IoIosStats, title: "Probability and Statistics", link: "https://youtube.com" },
    { Icon: MdOutlineBarChart, title: "Discrete Math", link: "https://youtube.com" },
    { Icon: MdOutlineMultilineChart, title: "Linear Algebra", link: "https://youtube.com" },
    { Icon: RiFunctionLine, title: "Differential Equations", link: "https://youtube.com" },
  ];

  return (
    <div className="w-full py-10 px-4 md:px-10 lg:px-20">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Related Courses</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map((course, index) => (
            <a
              key={index}
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-4 py-3 shadow-md flex flex-col justify-between border-2 border-transparent hover:border-steelBlue transition duration-200"
            >
              <div className="flex items-center justify-between">
                {course.Icon && <course.Icon className="text-3xl md:text-4xl text-black" />}
                <div className="ml-4 flex-1 text-sm md:text-lg font-medium">{course.title}</div>
                <div className="ml-auto">
                  <button className="text-steelBlue text-3xl md:text-4xl hover:text-white hover:bg-steelBlue transition-all duration-500 p-2 rounded-md flex items-center justify-center">
                    <LuArrowUpRight />
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedCourses;
