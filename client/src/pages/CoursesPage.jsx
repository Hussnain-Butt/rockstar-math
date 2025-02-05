import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useCart } from "../context/CartContext";
import { FaInfoCircle, FaClock, FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AnimatedSection from "../components/AnimatedSection";


function CoursesPage() {
    const { users } = useAuth();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // State to store fetched products
    const [services, setServices] = useState([]);

    // Fetch products from the backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/stripe/get-products")
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleAddToCart = (service) => {
        addToCart(service);
        toast.success(`${service.name} added to cart!`);
    };

    return (
        <>
          <div className='bg-deepBlue py-6 text-white mt-16'>
                      <h1 className="text-2xl font-bold text-center">Rockstar Math Tutoring Services</h1>
                      <p className="text-center text-white">Learn, Excel, Achieve!</p>
                  </div>
        <AnimatedSection direction="right">
                  
                  <div className="container mx-auto p-6 py-20">
                      <Toaster position="top-right" reverseOrder={false} />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {services.map((service) => (
                              <div
                                  key={service.id}
                                  className="bg-slate-100 text-deepBlue border border-gray-800 shadow-xl rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105"
                              >
                                  <div>
                                      {/* Service Name & Price */}
                                      <h2 className="text-lg font-semibold text-deepBlue">{service.name}</h2>
                                      <p className="text-emerald-400 font-bold text-xl">${service.price} {service.currency}</p>
      
                                      {/* Service Details Section */}
                                      <div className="bg-detext-deepBlue/10 backdrop-blur-md p-5 rounded-xl mt-3 border border-gray-700 shadow-inner">
                                          <p className="text-sm flex items-center gap-2 text-deepBlue">
                                              <FaInfoCircle className="text-blue-400" /> 
                                              <strong className="text-deepBlue">Details:</strong> {service.details}
                                          </p>
                                          <p className="text-sm flex items-center gap-2 mt-2 text-deepBlue">
                                              <FaClock className="text-yellow-400" /> 
                                              <strong className="text-deepBlue">Duration:</strong> {service.duration}
                                          </p>
                                          <p className="text-sm flex items-center gap-2 mt-2 text-deepBlue">
                                              <FaCalendarAlt className="text-red-400" /> 
                                              <strong className="text-deepBlue">Created:</strong> {service.created}
                                          </p>
                                      </div>
                                  </div>
      
                                  {/* Buttons Section */}
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
                          ))}
                      </div>
                  </div>

                  </AnimatedSection>
        </>
    );
}

export default CoursesPage;
