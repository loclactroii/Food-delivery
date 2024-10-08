import React, { useEffect, useState } from 'react'
import './ListItem.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListItem = () => {
    const api = 'https://food-delivery-9w50.onrender.com/api/food/'
    const [list, setList] = useState([])

    const getList = async () => {
        const response = await axios.get(api+'list')
        if (response.data.success) {
            setList(response.data.data)
        }
    }

    const removeFood = async (id) => {
        const response = await axios.post(api+'remove', {id: id})
        getList()
        if(response.data.success) {
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div className='listItem'>
            <p className='title'>All Foods List</p>
            <div className="list list-title">
                <p>Image</p>
                <p>Name</p>
                <p>Category</p>
                <p>Price</p>
                <p>Action</p>
            </div>
            <div className="list-items">
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-item list'>
                            <img src={'https://food-delivery-9w50.onrender.com/images/'+item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p onClick={()=>removeFood(item._id)} className='cross'>x</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListItem
