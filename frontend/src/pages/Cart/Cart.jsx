import React, { useContext } from 'react'
import './Cart.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios'
import {toast} from 'react-toastify'

const Cart = () => {
    const { cartItems, food_list, api, token, getCartItems, getTotalAmount } = useContext(StoreContext)

    const removeItem = async (id) => {
        const response = await axios.post(api+'/api/cart/remove',{itemId: id},{headers:{token}})
        if(response.data.success) {
            toast.success(response.data.message)
            getCartItems()
        }
    }

    return (
        <div className='cart'>
            <div className="container">
                <div className="list-item title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                <div className="list-items">
                    {food_list.map((item, index) => {
                        if (cartItems[item._id]) {

                            return (
                                <div key={index}>
                                    <div className='list-item'>
                                        <img src={api+'/images/'+item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>${item.price*cartItems[item._id]}</p>
                                        <p onClick={()=>removeItem(item._id)} className='cross'>x</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="cart-checkout">
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
                            <span>${getTotalAmount()+2}</span>
                        </div>
                        <Link to='/order'><button>PROCEED TO CHECKOUT</button></Link>
                    </div>
                    <div className="right-content">
                        <p>If you have a promote code. Enter it here</p>
                        <div>
                            <input type="text" placeholder='Promote code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart