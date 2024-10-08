import React from 'react'
import './MobileApp.css'
import { assets } from '../../assets/assets'

const MobileApp = () => {
  return (
    <div className='mobile-app' id='mobile-app'>
        <h2>For Better Experience Download <br /><span>Tomato App</span></h2>
        <div className="images">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default MobileApp