import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      toast.success(response.data.message); // Notify user
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <img
            src="/images/logo.png" // Replace with your logo path
            alt="Logo"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-4 text-sm font-medium text-gray-700">
            Provide the email address associated with your account to recover your password.
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                📧
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>{' '}
          |{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
