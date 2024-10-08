import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext()

const ContextProvider = (props) => {
  const api = 'http://localhost:4000'
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [food_list, setFood_list] = useState([])
  const [token, setToken] = useState(false)
  const [cartItems, setCartItems] = useState({})

  const getFood = async () => {
    const response = await axios.get(api+'/api/food/list')
    setFood_list(response.data.data)
  }

  const getCartItems = async () => {
    const response = await axios.get(api+'/api/cart/get',{headers:{token}})
    if(response.data.success) {
      setCartItems(response.data.data)
    }
    else {
      console.log(response.data.message);
    }
  }

  const getTotalAmount = () => {
    let total = 0
    for(const item in cartItems) {
      const foodInfo = food_list.find((product)=>product._id===item)
      total+=foodInfo.price*cartItems[item]
    }

    return total
  }

  useEffect(()=> {
    getFood()
    setToken(localStorage.getItem('token'))
  },[])

  useEffect(()=> {
    if(token) {
      getCartItems()
      setToken(localStorage.getItem('token'))
    }
  },[token])

  const data = {
    showLoginPopup,
    setShowLoginPopup,
    food_list,
    api,
    setToken,
    token,
    cartItems,
    setCartItems,
    getCartItems,
    getTotalAmount
  }
  return (
    <StoreContext.Provider value={data}>
      {props.children}
    </StoreContext.Provider>
  )
} 

export default ContextProvider