import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PayPal from "../components/PayPal";
const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty. Start adding items!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sky-600 font-semibold text-lg">{cart.length} Courses in Cart</p>
            </div>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 rounded-lg"
              >
                {/* Item Name & Description */}
                <div className="flex items-center gap-4 w-2/3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Price (Properly Aligned) */}
                <p className="text-green-600 font-semibold  w-1/6">${item.price}.00 USD</p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md w-1/6 text-center"
                >
                  <FaTrashAlt className="text-white" /> Remove
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Summary Sidebar */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 max-h-60">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Subtotal:</h2>
            <p className="text-3xl font-bold text-gray-900">
              ${cart.reduce((total, item) => total + item.price, 0)}.00 USD
            </p>
            <p className="text-gray-400 text-sm line-through">
              ${cart.reduce((total, item) => total + item.price * 1.2, 0).toFixed(2)} USD
            </p>

            <button 
             onClick={() => navigate("/checkout")}className="w-full px-6 py-3 mt-4 text-lg font-semibold text-white bg-deepBlue hover:bg-sky-600 transition-all duration-300 rounded-lg shadow-lg">
              Checkout Now
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CartPage;
