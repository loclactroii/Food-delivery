import React, { useContext, useEffect, useState } from 'react'
import './Order.css'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Order = () => {
    const navigate = useNavigate()
    const { getTotalAmount, api, cartItems, food_list, token } = useContext(StoreContext)
    const [address, setAddress] = useState({
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        city: '',
        State: '',
        zipcode: '',
        state: '',
        phone: ''
    })

    const inputHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setAddress({ ...address, [name]: value })
    }



    const onSubmit = async (e) => {
        e.preventDefault()
        let orderItems = []

        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item
                itemInfo["quantity"] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })

        let orderData = {
            items: orderItems,
            amount: getTotalAmount(),
            address: address
        }
        let response = await axios.post(api + '/api/order/place', orderData, { headers: { token } })
        if (response.data.success) {
            const { session_url } = response.data
            window.location.replace(session_url)
        }
        else {
            console.log(response.data.message);
        }
    }

    useEffect(() => {
       if(!token) {
        navigate('/cart')
       }
       else if(getTotalAmount()===0) {
        navigate('/cart')
       }
    })


    return (
        <div>
            <form onSubmit={onSubmit} className='order'>
                <div className="order-info">
                    <h2>Delivery Infomation</h2>
                    <div className="row-inputs">
                        <input required onChange={inputHandler} name='firstname' type="text" placeholder='First name' />
                        <input required onChange={inputHandler} name='lastname' type="text" placeholder='Last name' />
                    </div>
                    <input required onChange={inputHandler} name='email' type="email" placeholder='Email address' />
                    <input required onChange={inputHandler} name='street' type="text" placeholder='Street' />
                    <div className="row-inputs">
                        <input required onChange={inputHandler} name='city' type="text" placeholder='City' />
                        <input required onChange={inputHandler} name='State' type="text" placeholder='State' />
                    </div>
                    <div className="row-inputs">
                        <input required onChange={inputHandler} name='zipcode' type="text" placeholder='Zip code' />
                        <input required onChange={inputHandler} name='country' type="text" placeholder='Country' />
                    </div>
                    <input required onChange={inputHandler} name='phone' type="text" placeholder='Phone' />
                </div>
                <div className="left-content">
                    <h2>Cart Totals</h2>
                    <div>
                        <span>Subtotal</span>
                        <span>${getTotalAmount()}</span>
                    </div>
                    <hr />
                    <div>
                        <span>Delivery Free</span>
                        <span>$2</span>
                    </div>
                    <hr />
                    <div className='total'>
                        <span>Total</span>
                        <span>${getTotalAmount() + 2}</span>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </form>
        </div>
    )
}

export default Order