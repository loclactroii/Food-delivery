import React from 'react'
import './Order.css'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Orders = () => {
  const api = 'https://food-delivery-9w50.onrender.com'
  const [orders, setOrders] = useState([])

  const getAllOrders = async () => {
    const response = await axios.get(api + '/api/order/get')
    setOrders(response.data.data)
    console.log(response.data.data);

  }

  const updateStatus = async (e, id) => {
    const status = e.target.value
    const response = await axios.post(api+'/api/order/update',{orderId: id, status: status})
    if(response.data.success) {
      toast.success(response.data.message)
      getAllOrders()
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <div className='orders'>
      <div className="order-items">
        {orders.map((order, index) => {
          return (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (order.items.length - 1 === index) {
                      return <span className='bold'>{item.name + ' x ' + item.quantity}</span>
                    }
                    else {
                      return <span className='bold'>{item.name + ' x ' + item.quantity + ', '}</span>
                    }
                  })}
                </div>
                <p className='name bold'>{order.address.firstname + ' ' + order.address.lastname}</p>
                <p>{order.address.street}</p>
                <div>
                  <span>{order.address.State+', '+order.address.city+', '+order.address.country+', '+order.address.zipcode}</span>
                </div>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e)=>updateStatus(e, order._id)} value={order.status}>
                <option value="Food processing">Food processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
