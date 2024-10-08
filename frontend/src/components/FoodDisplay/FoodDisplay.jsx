import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

export const FoodDisplay = () => {
    const { food_list, api, cartItems, token, getCartItems } = useContext(StoreContext)
    const addCartItem = async (id) => {
        const response = await axios.post(api+'/api/cart/add',{itemId: id}, {headers:{token}})
        if(response.data.success) {
            getCartItems()
        }
        else {
            console.log(response.data.message);
        }
    }

    const removeCartItem = async (id) => {
        const response = await axios.post(api+'/api/cart/remove',{itemId: id}, {headers:{token}})
        if(response.data.success) {
            getCartItems()
        }
        else {
            console.log(response.data.message);
        }
    }

    return (
        <div className='food-display'>
            <h3>Top dishes near you</h3>
            <div className="food-display-items">
                {food_list.map((item, index) => {
                    return (
                        <div key={index} className="food-display-item">
                            <div className="images">
                                <img className='image' src={api+'/images/'+item.image} alt="" />
                                {cartItems[item._id]===0||cartItems[item._id]==undefined
                                ?<img onClick={()=>addCartItem(item._id)} className='white-add-icon' src={assets.add_icon_white} alt="" />
                                :<div>
                                    <img onClick={()=>removeCartItem(item._id)} src={assets.remove_icon_red} alt="" />
                                    <span>{cartItems[item._id]}</span>
                                    <img onClick={()=>addCartItem(item._id)} src={assets.add_icon_green} alt="" />
                                </div>
                                }
                            </div>
                            <div className="container">
                                <div className="rating">
                                    <h4>{item.name}</h4>
                                    <img src={assets.rating_starts} alt="" />
                                </div>
                                <p className='description'>{item.description}</p>
                                <p className='price'>${item.price}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
