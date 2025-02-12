import React from "react";
import { FaInfoCircle, FaClock, FaCalendarAlt, FaShoppingCart } from "react-icons/fa";

const ServiceCard = ({ service, users, handleAddToCart }) => {
  return (
    <div className="bg-slate-100 text-deepBlue border border-gray-800 shadow-xl rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div>
        {/* ✅ Service Name & Price */}
        <h2 className="text-lg font-semibold text-deepBlue">{service.name}</h2>
        <p className="text-emerald-400 font-bold text-xl">${service.price} {service.currency}</p>

        {/* ✅ Service Details Section */}
        <div className="bg-detext-deepBlue/10 backdrop-blur-md p-5 rounded-xl mt-3 border border-gray-700 shadow-inner">
          <p className="text-sm flex items-center gap-2 text-deepBlue">
            <FaInfoCircle className="text-blue-400" />
            <strong className="text-deepBlue">Details:</strong> {service.details}
          </p>
       
          
        </div>
      </div>

      {/* ✅ Buttons Section */}
      <div className="mt-4">
        {!users ? (
          <button className="bg-deepBlue text-white w-full py-3 rounded-xl hover:bg-sky-600 transition-all duration-300 shadow-lg">
            Sign Up
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              className="flex items-center justify-center gap-2 bg-deepBlue text-white w-full py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300 shadow-lg"
              onClick={() => handleAddToCart(service)}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
