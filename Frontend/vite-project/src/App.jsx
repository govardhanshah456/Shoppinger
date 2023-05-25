import './App.css'
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivationPage from './Components/Activation'
import SellerActivationPage from './Components/SellerActivation'
import axios from 'axios'
import { server } from './server'
import { useSelector, useDispatch } from "react-redux";
import HomePage from './Pages/HomepAge'
import ProductsPage from './Pages/ProductsPage'
import EventPage from './Pages/EventPage'
import BestSelling from './Pages/BestSelling'
import FAQPage from './Pages/FaqPage'
import Footer from './Components/Footer'
import { loadSeller, loadUser } from './redux/actions/user'
import Store from './redux/store'
import ProductDetailsPage from "./Pages/ProductDetailsPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx"
import ShopCreate from './Pages/ShopCreate'
import ShopLogin from './Pages/ShopLogin'
import ShopProfilePage from './Pages/ShopProfilePage'
import ProtectedRoute from './Routes/ProtectedRoute'
import SellerProtectedRoute from './Routes/SellerProtectedRoute'
import Loader from './Components/Loader'
import ShopHomePage from './Pages/ShopHomePage'
import ShopCreateProduct from './Pages/ShopCreateProduct'
import ShopShowProduct from './Pages/ShopShowProduct'
import ShopCreateEvent from './Pages/ShopCreateEvent'
import ShopAllEvents from './Pages/ShopAllEvents'
import ShopAllCouponCodes from './Pages/ShopAllCouponCodes'
import { getAllEvents } from './redux/actions/event'
import ShopPreviewPage from './Pages/ShopPreviewPage'
const App = () => {
  // const dispatch = useDispatch()
  const { loading, isAuthenticated } = useSelector((state) => state.user)
  const { isLoading, isAuthenticatedSeller } = useSelector((state) => state.seller)
  useEffect(() => {
    Store.dispatch(loadUser())
    Store.dispatch(loadSeller())
    Store.dispatch(getAllEvents())
  }, [])
  return (
    <>
      {loading || isLoading ? (<Loader />) : (<BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/activation/:activation_token" element={<ActivationPage />} />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/shop-create" element={<ShopCreate />} />
          <Route path="/shop-login" element={<ShopLogin />} />
          <Route path="/dashboard" element={<SellerProtectedRoute><ShopProfilePage /></SellerProtectedRoute>} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopShowProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvent />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCouponCodes />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop/preview/:id"
            element={
              <ShopPreviewPage />
            }
          />
        </Routes>
        {/* <Footer /> */}
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
      )}
    </>
  )
}

export default App
