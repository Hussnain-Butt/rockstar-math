import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // PayPal SDK

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (storedCart.length === 0) {
      navigate("/cart");
    } else {
      setCartItems(storedCart);
    }
  }, [navigate]);

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCompletePayment = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate("/");
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

            <form className="space-y-4" onSubmit={handlePaymentSubmit}>
              <div>
                <label className="text-gray-700 font-medium">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Card Details</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 font-medium">Expiry Date</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">CVV</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full px-6 py-3 mt-4 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-300 rounded-lg shadow-lg flex items-center justify-center gap-2"
              >
                <FaCreditCard /> Pay ${total.toFixed(2)} USD
              </button>
            </form>
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
                  <p className="text-green-600 font-bold text-lg">${item.price}.00 USD</p>
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
            <>
              <button 
                onClick={handleCompletePayment}
                className="w-full px-6 py-3 mt-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg shadow-lg flex items-center justify-center gap-2"
              >
                <FaCreditCard /> Complete Payment
              </button>

              {/* PayPal Button */}
              <div className="mt-4">
               {/* PayPal Button */}
          <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
          >
            <div className="mt-4">
              <PayPalButtons
                style={{ layout: "horizontal", color: "gold", shape: "pill", label: "paypal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{ amount: { value: totalAmount.toFixed(2) } }]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(() => {
                    alert("Payment Successful!");
                  });
                }}
              />
            </div>
          </PayPalScriptProvider>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-gray-900">Payment Successful</h2>
            <p className="text-gray-600">Redirecting to homepage...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
