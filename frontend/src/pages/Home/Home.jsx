import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import MobileApp from '../../components/MobileApp/MobileApp'

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <ExploreMenu />
      <FoodDisplay />
      <MobileApp />
    </div>
  )
}

export default Home