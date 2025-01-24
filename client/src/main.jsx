import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'

import App from './App.jsx'
import HomePage from "./pages/HomePage.jsx"
import ReviewsPage from "./pages/ReviewsPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import AboutPage from './pages/AboutPage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import FAQsPage from './pages/FAQsPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="faqs" element={<FAQsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
