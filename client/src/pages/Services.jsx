import React, { useEffect, useState, Suspense, lazy } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaInfoCircle, FaClock, FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// ✅ Lazy Load Components
const ServiceCard = lazy(() => import("../components/ServiceCard"));

const Services = () => {
  const { users } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ State to store fetched services
  const [services, setServices] = useState([]);

  // ✅ Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stripe/get-products")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = (service) => {
    addToCart(service);
    toast.success(`${service.name} added to cart!`);
  };

  return (
    <>
      {/* ✅ Hero Section */}
      <div className="bg-deepBlue py-6 text-white mt-16">
        <h1 className="text-2xl font-bold text-center">Rockstar Math Tutoring Services</h1>
        <p className="text-center text-white">Learn, Excel, Achieve!</p>
      </div>

      {/* ✅ Services List */}
      <div className="container mx-auto p-6 py-20">
        <Toaster position="top-right" reverseOrder={false} />

        {/* ✅ Lazy Load Services Cards */}
        <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading Services...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                users={users}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Services;
