import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51QKwhUE4sPC5ms3xgJZhmKyxW9B8Jg9NQHlCoxMzIjWqyIvRNmW8o3tNS4Hrg3guNIEe4hrn5i9dKpvZmXpeVkyp000FmIT2yn");

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (!storedCart || storedCart.length === 0) {
      navigate("/cart");
    } else {
      setCartItems(storedCart);
    }
  }, [navigate]);

  const subtotal = cartItems.reduce((total, item) => total + Number(item.price || 0), 0);
  const total = subtotal;

  // ✅ Handle Successful Payment with Toast Notification
  const handlePaymentSuccess = () => {
   alert("Payment Successfull")
    setTimeout(() => {
      navigate("/dashboard"); // ✅ Remove the trailing slash
    }, 2000);
  };

  return (
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 mt-24 z-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>
          <div className="border-b border-gray-300 mb-4"></div>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.details}</p>
                <p className="text-green-600 font-bold text-lg">${Number(item.price || 0).toFixed(2)} USD</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
          <div className="border-b border-gray-300 my-4"></div>

          <div className="flex justify-between text-gray-700 text-lg">
            <p>Subtotal:</p>
            <p>${subtotal.toFixed(2)} USD</p>
          </div>

          <div className="border-b border-gray-300 my-4"></div>
          <div className="flex justify-between text-gray-900 font-bold text-xl">
            <p>Total:</p>
            <p>${total.toFixed(2)} USD</p>
          </div>

          {!showPaymentForm && (
            <>
              <button 
                onClick={() => setShowPaymentForm(true)}
                className="w-full px-6 py-3 mt-5 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                <FaCreditCard /> Pay with Card
              </button>

              <div className="mt-6 z-10">
                <PayPalScriptProvider options={{ "client-id": "AaZbEygWpyKJsxxTXfZ5gSpgfm2rzf_mCanmJb80kbNg1wvj6e0ktu3jzxxjKYjBOLSkFTeMSqDLAv4L" }}>
                  <div className="relative z-20">
                    <PayPalButtons
                      style={{ layout: "vertical", color: "blue", shape: "pill", label: "paypal" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{ amount: { value: total.toFixed(2) } }]
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then(() => {
                          handlePaymentSuccess();
                        });
                      }}
                    />
                  </div>
                </PayPalScriptProvider>
                <div className="flex justify-center gap-3 mt-4"> 
                  <img src="/images/mastercard.png" alt="Mastercard" className="h-8 w-auto" /> 
                  <img src="/images/visa.png" alt="Visa" className="h-8 w-auto" /> 
                  <img src="/images/discover.png" alt="Discover" className="h-8 w-auto" /> 
                  <img src="/images/amex.png" alt="American Express" className="h-8 w-auto" /> 
                  <img src="/images/unionpay.png" alt="China UnionPay" className="h-8 w-auto" /> 
                  <img src="/images/eftpos.png" alt="Eftpos Australia" className="h-8 w-auto" /> 
                </div>
              </div>
            </>
          )}

          {showPaymentForm && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Enter Card Details</h2>
              <Elements stripe={stripePromise}>
                <PaymentForm totalAmount={total} onSuccess={handlePaymentSuccess} />
              </Elements>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
