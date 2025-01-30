import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_live_51QKwhUE4sPC5ms3x7cYIFoYqx3lULz1hFA9EoRobabZVPwdDm8KbDNlHOZMizb2YftdwRSyxRfyi93ovv5Rev7i300CpaQEtU2");

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (!storedCart || storedCart.length === 0) {
      navigate("/cart"); // Redirect if cart is empty
    } else {
      setCartItems(storedCart);
    }
  }, [navigate]);

  const subtotal = cartItems.reduce((total, item) => total + Number(item.price || 0), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // ✅ Function to handle successful payment
  const handlePaymentSuccess = () => {
    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate("/dashboard"); // 🚀 Redirect to Dashboard
    }, 3000);
  };

  return (
    <div className="container mx-auto p-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Left Side: Payment Form */}
        {showPaymentForm ? (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
            <Elements stripe={stripePromise}>
              <PaymentForm totalAmount={total} onSuccess={handlePaymentSuccess} />
            </Elements>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>
            <div className="border-b border-gray-200 my-4"></div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.details}</p>
                  <p className="text-green-600 font-bold text-lg">${Number(item.price || 0).toFixed(2)} USD</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Right Side: Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
          <div className="border-b border-gray-200 my-4"></div>

          <div className="flex justify-between text-gray-700">
            <p>Subtotal:</p>
            <p>${subtotal.toFixed(2)} USD</p>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <p>Taxes (10%):</p>
            <p>${(subtotal * 0.1).toFixed(2)} USD</p>
          </div>
          <div className="border-b border-gray-200 my-4"></div>
          <div className="flex justify-between text-gray-900 font-semibold text-lg">
            <p>Total:</p>
            <p>${total.toFixed(2)} USD</p>
          </div>

          {!showPaymentForm && (
            <button 
              onClick={() => setShowPaymentForm(true)}
              className="w-full px-6 py-3 mt-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg shadow-lg flex items-center justify-center gap-2"
            >
              <FaCreditCard /> Pay with Card
            </button>
          )}
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-gray-900">Payment Successful</h2>
            <p className="text-gray-600">Redirecting to Dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
