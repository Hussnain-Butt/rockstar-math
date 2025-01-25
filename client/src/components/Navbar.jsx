import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdLockOutline } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
export function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { users, logout,updateCounter  } = useAuth();
  console.log('Navbar user:', users);

  useEffect(() => {
    console.log("Navbar re-rendered due to user or updateCounter change.");
    console.log("Current user:", users);
    console.log("Update Counter:", updateCounter);
  }, [user, updateCounter]);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1])); // Decode JWT
      } catch (e) {
        return null;
      }
    };

    if (token) {
      try {
        const decodedToken = parseJwt(token);
        if (decodedToken) {
          setUser({ name: decodedToken.name }); // Adjust based on your JWT payload
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null); // Reset user state
    window.location.href = "/login"; // Redirect to login page
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white lg:px-16 shadow-md">
      <nav
        aria-label="Global"
        className="mx-auto max-w-7xl flex items-center justify-between px-4 lg:px-0 py-3"
      >
        {/* Logo */}
        <div className="flex items-center justify-between lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="logo" src="/images/logo.png" className="h-auto w-[200px]" />
          </a>
        </div>

        {/* Links + Login and Sign Up Buttons */}
        <div className="hidden xl:flex lg:gap-x-6 lg:items-center text-lg">
          {/* Navigation Links */}
          {[
            { to: "/", label: "Home" },
            { to: "/reviews", label: "Reviews" },
            { to: "/courses", label: "Courses" },
            { to: "/calendar", label: "Calendar" },
            { to: "/faqs", label: "FAQs" },
            { to: "/blogs", label: "Blogs" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-medium"
                  : "text-gray-700 hover:text-yellow-500 hover:scale-105 transition-all duration-300"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* User State-Based Buttons */}
          {user ? (
            <>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md shadow-sm transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={handleLinkClick}
                className="flex items-center text-gray-700 hover:text-yellow-500 hover:scale-105 transition-all duration-300"
              >
                <MdLockOutline className="w-6 h-6 mr-1" /> Log in
              </NavLink>
              <NavLink
                to="/signup"
                onClick={handleLinkClick}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition-all duration-300"
              >
                Sign Up for Free
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex xl:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 z-20 w-[280px] overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10 transform transition-all ease-in-out duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img alt="logo" src="/images/logo.png" className="h-8 w-auto" />
          </NavLink>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col mt-6 space-y-4">
          {[
            { to: "/", label: "Home" },
            { to: "/reviews", label: "Reviews" },
            { to: "/courses", label: "Courses" },
            { to: "/calendar", label: "Calendar" },
            { to: "/faqs", label: "FAQs" },
            { to: "/blogs", label: "Blogs" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded-md ${
                  isActive
                    ? "bg-yellow-500 text-white"
                    : "text-gray-700 hover:text-yellow-500 hover:scale-105 transition-all duration-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {users ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md shadow-sm transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={handleLinkClick}
                className="text-gray-700 hover:text-yellow-500 hover:scale-105 transition-all duration-300"
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                onClick={handleLinkClick}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition-all duration-300"
              >
                Sign Up for Free
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
