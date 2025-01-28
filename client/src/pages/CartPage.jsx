import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Sync local state with context on mount & when cart updates
  useEffect(() => {
    setCartItems(cart); // Sync cart state with context
  }, [cart]);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id); // Remove selected item
    setCartItems(updatedCart); // Update state immediately

    // Update local storage to persist the change
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    removeFromCart(id); // Call context function to update global cart state

    // If cart is empty, redirect to cart page
    if (updatedCart.length === 0) {
      navigate("/cart");
    }
  };

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Store updated cart
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-6 py-16 ">

      {cartItems.length === 0 ? (
         <div className="flex flex-col items-center justify-center h-[400px]">
         <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center w-96">
           <FaShoppingCart className="text-gray-400 text-6xl mx-auto mb-4" />
           <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
           <p className="text-gray-500 mt-2">Start adding items to your cart now!</p>
           
           {/* CTA Button */}
           <button
             onClick={() => navigate("/services")}
             className="mt-6 bg-deepBlue text-white px-6 py-3 rounded-lg shadow-md hover:bg-sky-600 transition-all duration-300"
           >
             Browse Courses
           </button>
         </div>
       </div>
      ) : (
        <>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center mt-10">Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sky-600 font-semibold text-lg">
                {cartItems.length} {cartItems.length > 1 ? "Courses" : "Course"} in Cart
              </p>
            </div>

            {cartItems.map((item) => (
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

                {/* Price */}
                <p className="text-green-600 font-semibold w-1/6">${item.price}.00 USD</p>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
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
              ${cartItems.reduce((total, item) => total + item.price, 0)}.00 USD
            </p>
            <p className="text-gray-400 text-sm line-through">
              ${cartItems.reduce((total, item) => total + item.price * 1.2, 0).toFixed(2)} USD
            </p>

            <button 
              onClick={handleCheckout}
              className="w-full px-6 py-3 mt-4 text-lg font-semibold text-white bg-deepBlue hover:bg-sky-600 transition-all duration-300 rounded-lg shadow-lg"
            >
              Checkout Now
            </button>
          </div>
        </div>
        </> )}
    </div>
  );
};

export default CartPage;
