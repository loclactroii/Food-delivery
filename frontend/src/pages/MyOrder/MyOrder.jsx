import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrder = () => {
  const [orders, setOrders] = useState([])
  const { api, token } = useContext(StoreContext)

  const getOrders = async () => {
    const response = await axios.post(api + '/api/order/myorders', {}, { headers: { token } })

    if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data);
    }
  }

  useEffect(() => {
    if(token) {
      getOrders()
    }
  }, [token])

  return (
    <div className='myorder'>
      <h3>MyOrder</h3>
      <div className='myorder-items'>
        {
          orders.map((order, index) => {
            return (
              <div key={index} className="myorder-item">
                <img src={assets.parcel_icon} alt="" />
                <div>
                  {order.items.map((item, index) => {
                    if (order.items.length - 1 === index) {
                      return (
                        <span key={index}>{item.name + ' x ' + item.quantity}</span>
                      )
                    }
                    else {
                      return (
                        <span key={index}>{item.name + ' x ' + item.quantity + ', '}</span>
                      )
                    }
                  })}
                </div>
                <p>${order.amount}</p>
                <p>Items: {order.items.length}</p>
                <p className='status'><span>&#x25cf;</span>  {order.status}</p>
                <button onClick={()=>getOrders()}>Track Order</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyOrder