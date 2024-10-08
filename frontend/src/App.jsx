import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { StoreContext } from './components/context/StoreContext'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import MyOrder from './pages/MyOrder/MyOrder'

const App = () => {
  const { showLoginPopup } = useContext(StoreContext)

  return (
    <>
      {showLoginPopup?<LoginPopup />:<></>}
      <div className='app'>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App