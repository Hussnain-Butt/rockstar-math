import React, { useEffect, useState, Suspense, lazy } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

// ✅ Lazy Load Components
const ServiceCard = lazy(() => import('../components/ServiceCard'))

const Services = () => {
  const { users } = useAuth()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // ✅ State to store fetched services
  const [services, setServices] = useState([])

  // ✅ Fetch products from the backend
  useEffect(() => {
    axios
      .get('https://rockstar-math-production.up.railway.app/api/stripe/get-products')
      .then((response) => {
        setServices(response.data)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
  }, [])

  const handleAddToCart = (service) => {
    addToCart(service)
    toast.success(`${service.name} added to cart!`)
  }

  // ✅ Grouping Services into 3 categories
 const categorizedServices = {
    'Seasonal - AP Calc Sessions': services.filter(
      (service) => /(\bAP Calc Review 20 hours\b)/i.test(service.name),
    ),
    '30 Minute Sessions - *Recommended For Algebra 1 Students And Below*': services.filter(
      (service) =>
        /(\b8 x 30 minutes\b|\b5 x 30 minutes\b|\b3 x 30 minutes\b|3 - 30 minutes\b|5 - 30 minutes\b)/i.test(
          service.name,
        ),
    ),
    '60 Minute Sessions - Standard': services.filter((service) =>
      /(\b8 x 60 minutes\b|\b5 x 60 minutes\b|\b3 x 60 minutes\b)/i.test(service.name),
    ),

    '90 Minute Sessions - *Recommended For Calc 1 Students And Higher*': services.filter(
      (service) => /(\b8 x 90 minutes\b|\b5 x 90 minutes\b|\b3 x 90 minutes\b|\b8 - 90 minutes\b)/i.test(service.name),
    ),
    'Seasonal - AP Calc Sessions': services.filter(
      (service) => /(\b13 x 30 minutes\b|\b13 x 60 minutes\b|\b13 x 90 minutes\b)/i.test(service.name),
    ),

  }

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

        {/* ✅ Display Services by Category */}
        <Suspense
          fallback={<div className="text-center py-10 text-gray-500">Loading Services...</div>}
        >
          {Object.entries(categorizedServices).map(
            ([category, items]) =>
              items.length > 0 && (
                <div key={category} className="mb-12">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">{category}</h2>
                  {/* ✅ 3 Cards Per Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        users={users}
                        handleAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              ),
          )}
        </Suspense>
      </div>
    </>
  )
}

export default Services
