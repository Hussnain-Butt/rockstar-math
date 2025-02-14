import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const RegisterBeforeCheckout = () => {
  const [formData, setFormData] = useState({
    userType: 'Parent',
    adultName: '',
    numStudents: '',
    studentNames: '',
    studentGrades: '',
    studentMathLevels: '',
    billingEmail: '',
    schedulingEmails: '',
    phone: '',
    parentEmail: '',
    parentPhone: '',
    studentPhone: '',
    goals: '',
    didUserApproveSMS: false,
    didUserApproveWebcam: false,
  })
  const [otp, setOtp] = useState(""); // OTP input field
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false); // OTP popup state
  const [isOtpVerified, setIsOtpVerified] = useState(false); // OTP verification state
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store received OTP for comparison
  const [isWebcamPopupOpen, setIsWebcamPopupOpen] = useState(false);
  const [isSmsPopupOpen, setIsSmsPopupOpen] = useState(false);
  
  const navigate = useNavigate()

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

    // ✅ Prevent negative values in "Number of Students"
    const handleNumStudentsChange = (e) => {
      let value = parseInt(e.target.value, 10);
      if (isNaN(value) || value < 0) {
        value = 0;
      }
      setFormData((prev) => ({
        ...prev,
        numStudents: value,
      }));
    };

  // ✅ Open OTP Popup (Checkbox or Text Click)
// ✅ Open OTP Popup and Send OTP
const openOtpPopup = async () => {
  if (!formData.phone || formData.phone === "") {
    toast.error("Please enter a valid phone number!");
    return;
  }

  setIsOtpPopupOpen(true);

  try {
    const response = await axios.post("https://rockstar-math-production.up.railway.app/api/send-otp", {
      phone: formData.phone,
    });

    if (response.data.success) {
      toast.success("OTP sent successfully!");
      setGeneratedOtp(response.data.otp); // ⚠️ Store OTP securely (Remove this in production!)
    } else {
      toast.error("Failed to send OTP. Try again!");
    }
  } catch (error) {
    toast.error(error.response?.data?.error || "Error sending OTP.");
  }
};

 // ✅ Handle Webcam Agreement
 const openWebcamPopup = (e) => {
  e.preventDefault();
  setIsWebcamPopupOpen(true);
};

const handleAgreeWebcam = () => {
  setFormData((prev) => ({ ...prev, didUserApproveWebcam: true }));
  setIsWebcamPopupOpen(false);
};


// ✅ Verify OTP Dynamically
const verifyOtp = async () => {
  try {
    const response = await axios.post("https://rockstar-math-production.up.railway.app/api/verify-otp", {
      phone: formData.phone,
      otp,
    });

    if (response.data.success) {
      toast.success("OTP Verified Successfully!");
      setIsOtpVerified(true);
      setIsOtpPopupOpen(false);
    } else {
      toast.error("Invalid OTP. Try again.");
    }
  } catch (error) {
    toast.error(error.response?.data?.error || "OTP Verification Failed.");
  }
};
  // ✅ Handle SMS Checkbox & Open OTP Popup
  const handleSmsCheckboxChange = async (e) => {
    const isChecked = e.target.checked
    setFormData((prev) => ({ ...prev, didUserApproveSMS: isChecked }))

    if (isChecked) {
      setIsOtpPopupOpen(true)
      try {
        const response = await axios.post('https://rockstar-math-production.up.railway.app/api/send-otp', {
          phone: formData.phone,
        })

        if (response.data.success) {
          toast.success('OTP sent successfully!')
        } else {
          toast.error('Failed to send OTP. Try again!')
        }
      } catch (error) {
        toast.error(error.response?.data?.error || 'Error sending OTP.')
      }
    }
  }



   // ✅ Page load hone pe check karein ke user pehle register ho chuka hai ya nahi
   useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const phone = localStorage.getItem('userPhone');

        if (!email || !phone) return; // User ka data nahi hai, allow registration

        const response = await axios.post("https://rockstar-math-production.up.railway.app/api/check-registration", { email, phone });

        if (response.data.success) {
          toast.success("You are already registered! Redirecting to checkout...");
          setTimeout(() => navigate("/checkout"), 2000);
        }
      } catch (error) {
        console.error("❌ Error checking registration:", error);
      }
    };

    checkUserRegistration();
  }, [navigate]);

  const openSmsPopup = (e) => {
    e.preventDefault();
    setIsSmsPopupOpen(true);
  };

  const handleAgreeSms = () => {
    setFormData((prev) => ({ ...prev, didUserApproveSMS: true }));
    setIsSmsPopupOpen(false);
    openOtpPopup(); // ✅ Send OTP after agreeing
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('📝 Form Data Before Submission:', formData)

    const requiredFields = [
      'userType',
      'adultName',
      'numStudents',
      'studentNames',
      'studentGrades',
      'studentMathLevels',
      'billingEmail',
      'schedulingEmails',
      'phone',
      'goals',
    ]

    for (const field of requiredFields) {
      if (!formData[field] || formData[field] === '') {
        toast.error(`${field.replace(/([A-Z])/g, ' $1')} is required!`)
        return
      }
    }

    if (formData.didUserApproveSMS && !isOtpVerified) {
      toast.error('Please verify your OTP before proceeding!')
      return
    }

    if (!formData.didUserApproveSMS) {
      toast.error('You must agree to receive SMS notifications!');
      return;
    }
    if (!formData.didUserApproveWebcam) {
      toast.error('You must agree to use a webcam!');
      return;
    }

    if (formData.didUserApproveSMS && !isOtpVerified) {
      toast.error('Please verify your OTP before proceeding!');
      return;
    }


    try {
      const response = await axios.post('https://rockstar-math-production.up.railway.app/api/register', formData)
      if (response.data.success) {
        toast.success(response.data.message);

        // ✅ Store user details in localStorage
        localStorage.setItem("userEmail", formData.billingEmail);
        localStorage.setItem("userPhone", formData.phone);

        // ✅ Redirect to checkout
        setTimeout(() => navigate("/checkout"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed.')
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-32">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Register Before Checkout
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* ✅ User Type Selection */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">
              Are you a Student or Parent? *
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Parent">Parent (Preferred)</option>
              <option value="Student">Student</option>
            </select>
          </div>

          {/* ✅ Student Age Field (Only Show If "Student" is Selected) */}
          {formData.userType === 'Student' && (
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium">Student Age *</label>
              <input
                type="number"
                name="studentAge"
                value={formData.studentAge}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* ✅ Always Show These Inputs */}
          {[
            { name: 'adultName', label: 'Name of Adult *' },
            { name: 'numStudents', label: 'Number of Students *', type: 'number' },
            { name: 'studentNames', label: 'Name of Student(s) *' },
            { name: 'studentGrades', label: 'Grade of Student(s) *' },
            { name: 'studentMathLevels', label: 'Level of Math for Student(s) *' },
            { name: 'billingEmail', label: 'Email for Billing *', type: 'email' },
            { name: 'schedulingEmails', label: 'Email(s) for Scheduling *', type: 'email' },
            { name: 'phone', label: 'Phone Number *' },
            { name: 'goals', label: 'Your Goals & Expectations *' },
          ].map(({ name, label, type = 'text' }) => (
            <div key={name} className="col-span-2 md:col-span-1">
              <label className="block text-gray-700 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={name === 'numStudents' ? handleNumStudentsChange : handleChange}
                min={name === 'numStudents' ? '0' : undefined}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* ✅ Conditionally Show Parent Fields Only If Student Age < 18 */}
          {formData.userType === 'Student' &&
            formData.studentAge &&
            parseInt(formData.studentAge) < 18 && (
              <>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium">Parent's Email *</label>
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium">Parent's Phone *</label>
                  <input
                    type="text"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

          {/* ✅ Checkboxes */}
          <div className="col-span-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="didUserApproveSMS"
                checked={formData.didUserApproveSMS}
                onChange={handleSmsCheckboxChange}
              />
              <Link
                to="#"
                onClick={openSmsPopup}
                className="text-gray-700 text-sm underline  text-blue-700"
              >
                I agree to receive SMS notifications
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="didUserApproveWebcam"
                checked={formData.didUserApproveWebcam}
                onChange={handleChange}
              />
               <Link
                to="#"
                onClick={openWebcamPopup}
                className="text-gray-700 text-sm underline  text-blue-700"
              >
                I agree to use a webcam
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="col-span-2 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
          >
            Continue to Checkout
          </button>
        </form>
      </div>

 {/* ✅ Webcam Agreement Popup */}
 {isWebcamPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-14">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-96 text-center">
            <h3 className="text-2xl font-bold text-gray-800">Webcam Attendance Agreement</h3>
            <p className="text-sm text-gray-600 mt-4 text-left">
              Rockstar Math Webcam Attendance & Identity Verification Policy
            </p>
            <ul className="text-left text-gray-600 text-sm mt-2">
              <li>✅ Attendance Verification – Ensuring students are present for their scheduled sessions.</li>
              <li>✅ Identity Confirmation – Preventing unauthorized individuals from joining sessions.</li>
              <li>✅ Engagement & Participation – Encouraging active participation in lessons.</li>
            </ul>
            <p className="text-left text-gray-600 text-sm mt-2">
              <strong>Agreement Terms:</strong>
              <br />
              ● Students must have their webcam turned on during all live sessions.
              <br />
              ● Failure to comply may result in removal from the session.
              <br />
              ● Exceptions may be granted for documented technical difficulties or special accommodations.
            </p>
            <button
              onClick={handleAgreeWebcam}
              className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-md"
            >
              I AGREE
            </button>
          </div>
        </div>
      )}

  {/* ✅ SMS Agreement Popup */}
  {isSmsPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-14">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-96 text-center">
            <h3 className="text-2xl font-bold text-gray-800">
              SMS Text Agreement
            </h3>
            <p className="text-sm text-gray-600 mt-4 text-left">
              Rockstar Math SMS Notification & Alerts Agreement
            </p>
            <p className="text-left text-gray-600 text-sm mt-2">
              By providing your phone number during registration, you consent to
              receive SMS notifications, updates, and alerts related to your
              tutoring sessions, payment confirmations, and important
              announcements from Rockstar Math.
            </p>
            <p className="text-left text-gray-600 text-sm mt-2">
              <strong>Opt-Out Instructions:</strong>
              <br />
              ● To stop SMS notifications, reply STOP to any message.
              <br />
              ● For further assistance, contact us at x@gmail.com.
            </p>
            <button
              onClick={handleAgreeSms}
              className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-md"
            >
              I AGREE
            </button>
          </div>
        </div>
      )}

      {/* ✅ OTP Popup */}
      {isOtpPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-96 text-center">
            <h3 className="text-2xl font-bold text-gray-800">Enter Verification Code</h3>
            <p className="text-gray-500 text-sm mt-2">
              We've sent a code to{' '}
              <span className="text-blue-500 font-semibold">{formData.phone}</span>
            </p>

            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full tracking-widest text-2xl text-center font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mt-4 py-3"
            />

            <button
              onClick={verifyOtp}
              className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-md"
            >
              VERIFY
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegisterBeforeCheckout
