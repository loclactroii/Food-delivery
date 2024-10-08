import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [selectedMenu, setSelectedMenu] = useState('home')
  const { setShowLoginPopup, token, getTotalAmount, setToken } = useContext(StoreContext)

  return (
    <div className='navbar'>

      <Link to='/'><img className='navbar-logo' src={assets.logo} alt="" /></Link>
      <div className="navbar-menu">
        <ul>
          <Link to='/' onClick={() => setSelectedMenu('home')} className={selectedMenu === 'home' ? 'active' : ''}>home</Link>
          <a href='#explore-menu' onClick={() => setSelectedMenu('menu')} className={selectedMenu === 'menu' ? 'active' : ''}>menu</a>
          <a href='#mobile-app' onClick={() => setSelectedMenu('mobile-app')} className={selectedMenu === 'mobile-app' ? 'active' : ''}>mobile app</a>
          <a href='#contact-us' onClick={() => setSelectedMenu('contact-us')} className={selectedMenu === 'contact-us' ? 'active' : ''}>contact us</a>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to='/cart' className='basket'>
          <img src={assets.basket_icon} alt="" />
          {getTotalAmount() === 0 ? <></> : <span></span>}
        </Link>

        {!token ? <button onClick={() => setShowLoginPopup(true)}>Sign in</button> :
          <div className='navbar-new'>
            <img className='profile-icon' src={assets.profile_icon} alt="" />
            <div className="navbar-user">
              <Link to='/myorders'>
                <div>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </div>
              </Link>
              <hr />
              <div onClick={() => setToken(false)}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar