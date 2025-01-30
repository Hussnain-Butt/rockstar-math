import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";

const PaymentForm = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        
        try {
            const { data } = await axios.post("http://localhost:5000/api/stripe/create-payment-intent", {
                amount: totalAmount,
                currency: "usd",
            });
            
            const clientSecret = data.clientSecret;
            
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);
                setProcessing(false);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    alert("Payment Successful!");
                    navigate("/");
                }
            }
        } catch (error) {
            setError("Payment failed. Please try again.");
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-3 border border-gray-300 rounded-lg" />
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full px-6 py-3 mt-4 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
                <FaCreditCard /> {processing ? "Processing..." : `Pay $${totalAmount.toFixed(2)} USD`}
            </button>
        </form>
    );
};

export default PaymentForm;
