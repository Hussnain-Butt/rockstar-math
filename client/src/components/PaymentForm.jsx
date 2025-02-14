import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { FaCreditCard } from "react-icons/fa";

const PaymentForm = ({ totalAmount, paymentIntentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        console.error("❌ Stripe or Elements not initialized");
        return;
    }

    if (!clientSecret) {
        console.error("❌ Missing `clientSecret`. Cannot process payment.");
        toast.error("Payment error: Missing client secret.");
        return;
    }

    setLoading(true);

    try {
        console.log("🔹 Confirming payment with Stripe...");

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,  // ✅ Using clientSecret from state
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            }
        );

        setLoading(false);

        if (error) {
            console.error("❌ Payment Failed:", error);
            toast.error(`Payment Failed: ${error.message}`);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            console.log("✅ Payment Successful:", paymentIntent);
            toast.success("Payment Successful! Redirecting...");
            setTimeout(() => window.location.href = "/dashboard", 2000);
        } else {
            console.warn("⚠️ Unexpected payment status:", paymentIntent);
            toast.error("Unexpected payment status. Please try again.");
        }
    } catch (error) {
        console.error("❌ Payment Processing Error:", error);
        toast.error("An error occurred during payment. Please try again.");
        setLoading(false);
    }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border border-gray-300 rounded-lg w-full" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-6 py-3 text-lg font-semibold text-white bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-lg shadow-md flex items-center justify-center gap-2"
      >
        <FaCreditCard /> {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)} USD`}
      </button>
    </form>
  );
};

export default PaymentForm;
