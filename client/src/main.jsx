import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import ReviewsPage from './pages/ReviewsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import FAQsPage from './pages/FAQsPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Services from './pages/Services.jsx'
import { CartProvider } from "./context/CartContext";
import CartPage from './pages/CartPage.jsx'

createRoot(document.getElementById('root')).render(
<AuthProvider>
<CartProvider>
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="reviews" element={<ReviewsPage />} />
      <Route path="calendar" element={<CalendarPage />} />
      <Route path="faqs" element={<FAQsPage />} />
      <Route path="courses" element={<CoursesPage />} />
      <Route path="blogs" element={<BlogPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="services" element={<Services />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="cart" element={<CartPage />} />

    </Routes>
    <Footer />
  </BrowserRouter>
  </CartProvider>
</AuthProvider>

)
