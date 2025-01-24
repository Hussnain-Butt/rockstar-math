import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          <h2 className="mt-4 text-lg font-medium text-gray-800">
            Provide the email address associated with your account to recover your password.
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="absolute left-3 top-3.5 text-gray-400">
              📧
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Log In
          </a>{' '}
          |{' '}
          <a
            href="/signup"
            className="text-blue-600 hover:underline"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
