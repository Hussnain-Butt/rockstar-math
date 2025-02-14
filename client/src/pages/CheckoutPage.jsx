import React, { useEffect, useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy Load Components
const PaymentForm = lazy(() => import("../components/PaymentForm"));

// ✅ Load Stripe Public Key
const stripePromise = loadStripe("pk_live_51QKwhUE4sPC5ms3x7cYIFoYqx3lULz1hFA9EoRobabZVPwdDm8KbDNlHOZMizb2YftdwRSyxRfyi93ovv5Rev7i300CpaQEtU2");

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);  // ✅ Ensure `clientSecret` is used
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

  // ✅ Prevent $0.00 Payments
  const handleZeroAmount = () => {
    toast.error("Cannot process a payment of $0.00!");
  };

// ✅ Create Stripe Payment Intent
const createPaymentIntent = async () => {
    if (total <= 0) {
        handleZeroAmount();
        return null;
    }

    try {
        const userId = localStorage.getItem("userId") || "guest_user";
        const orderId = `order_${Date.now()}`;
        const currency = "usd";

        console.log("🔹 Sending Payment Request:", { amount: total, currency, userId, orderId });

        const response = await fetch("https://rockstar-math-production.up.railway.app/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total, currency, userId, orderId }),
        });

        if (!response.ok) {
            console.error("❌ Failed to create payment intent. Status:", response.status);
            throw new Error(`Payment Intent creation failed. Server responded with ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.clientSecret) {
            console.error("❌ Missing `clientSecret` in API response", data);
            throw new Error("Payment processing error. No clientSecret returned.");
        }

        console.log("✅ Payment Intent Created:", data);

        setPaymentIntentId(data.id);  // ✅ Storing Payment Intent ID
        setClientSecret(data.clientSecret); // ✅ Storing clientSecret for PaymentForm
        return data.clientSecret;

    } catch (error) {
        console.error("❌ Payment Intent Error:", error);
        toast.error(`Payment Error: ${error.message}`);
        return null;
    }
};

// ✅ Handle Payment Success (Stripe & PayPal)
const handlePaymentSuccess = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            toast.error("User not logged in!");
            return;
        }

        const response = await fetch("https://rockstar-math-production.up.railway.app/api/users/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, classData: cartItems }),
        });

        if (!response.ok) throw new Error("Failed to save purchased class");

        toast.success("Payment Successful! Class added to dashboard.");
        setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
        console.error("Error saving purchased class:", error);
        toast.error("Error saving purchased class.");
    }
};

return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Review Order */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-green-600 font-bold text-lg">${Number(item.price || 0).toFixed(2)} USD</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
          <div className="flex justify-between text-gray-900 font-bold text-xl">
            <p>Total:</p>
            <p>${total.toFixed(2)} USD</p>
          </div>

          {!showPaymentForm && (
            <>
              <button
                onClick={() => {
                  if (total > 0) {
                    setShowPaymentForm(true);
                    createPaymentIntent();
                  } else {
                    handleZeroAmount();
                  }
                }}
                className="w-full px-6 py-3 mt-5 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                <FaCreditCard /> Pay ${total.toFixed(2)} USD
              </button>
            </>
          )}

          {showPaymentForm && clientSecret && (
            <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading Payment Form...</div>}>
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Enter Card Details</h2>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm totalAmount={total} paymentIntentId={paymentIntentId} createPaymentIntent={createPaymentIntent} onSuccess={handlePaymentSuccess} />
                </Elements>
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
