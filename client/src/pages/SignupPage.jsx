import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import axiosInstance from '../utils/axiosInstance'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function SignupPage() {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate(); // For redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/auth/signup', formData);
      toast.success(response.data.message); // Show success toast

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message || 'Something went wrong'); // Show error toast
    }
  };

  return (
    <>
      <div className="flex">
        <div className="hidden w-1/2 bg-white xl:flex">
          <img src="/images/login.jpg" alt="Signup Illustration" className="w-full" />
        </div>
        <div className="w-full lg:w-1/2 bg-white flex flex-col items-center mt-10 px-10 md:px-20 lg:px-48">
          <img src="/images/logo.png" alt="Logo" className="w-[280px] h-auto" />
          <h1 className="text-5xl font-bold text-black mb-2">Sign Up</h1>
          <p className="text-gray-600 mb-6">Create an account to get started!</p>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4 w-full">
              <label className="block text-sm font-bold text-black mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 bg-gray2 rounded-lg outline-none"
              />
            </div>

            <div className="mb-4 w-full">
              <label className="block text-sm font-bold text-black mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 bg-gray2 rounded-lg outline-none"
              />
            </div>

            <div className="mb-4 w-full relative">
              <label className="block text-sm font-bold text-black mb-2" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 bg-gray2 rounded-lg outline-none"
              />
              <div
                className="absolute right-4 top-[55%] text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>

            <div className="mb-4 w-full relative">
              <label className="block text-sm font-bold text-black mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 bg-gray2 rounded-lg outline-none"
              />
              <div
                className="absolute right-4 top-[55%] text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>

            <button type="submit" className="w-full bg-deepBlue text-white py-2 rounded hover:bg-sky-600 transition-all duration-500">
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{' '}
           
            <NavLink to="/login" className="text-blue-500">
            Log in here
          </NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignupPage
