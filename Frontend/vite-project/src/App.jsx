import './App.css'
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivationPage from './Components/Activation'
import axios from 'axios'
import { server } from './server'
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from './redux/slices/userSlice'
import HomePage from './Pages/HomepAge'
import ProductsPage from './Pages/ProductsPage'
import EventPage from './Pages/EventPage'
import BestSelling from './Pages/BestSelling'
import FAQPage from './Pages/FaqPage'
import Footer from './Components/Footer'
const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(loadUser())
  }, [isAuthenticated])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>

  )
}

export default App
