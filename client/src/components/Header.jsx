import React from "react";
import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-white shadow-sm px-10 py-4 flex items-center justify-between w-full mt-16">
      {/* Left Section - Welcome Message */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Welcome Jayla</h1>
        <p className="text-gray-500 text-sm">Welcome nice to see you!!</p>
      </div>

      {/* Right Section - Icons & User Profile */}
      <div className="flex items-center space-x-6">
        {/* Search Icon */}
        {/* <FaSearch className="text-gray-600 text-lg cursor-pointer" /> */}

        {/* Notification Bell with Badge */}
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-600 text-lg" />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full"></span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* User Image */}
         
          {/* User Info */}
          <div className="hidden md:block">
            <p className="text-gray-800 font-medium">Jayla</p>
          </div>
          {/* Dropdown Icon */}
          <FaChevronDown className="text-gray-600 text-sm" />
        </div>
      </div>
    </div>
  );
};

export default Header;
