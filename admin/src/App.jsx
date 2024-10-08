import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route} from 'react-router-dom'
import AddItem from './pages/AddItem/AddItem'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListItem from './pages/ListItem/ListItem'
import Orders from './pages/Orders/Orders'

const App = () => {
  return (
    <div className='app'>
        <ToastContainer />
        <Navbar />
      <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<AddItem />}/>
          <Route path='/list' element={<ListItem />}/>
          <Route path='/orders' element={<Orders />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App