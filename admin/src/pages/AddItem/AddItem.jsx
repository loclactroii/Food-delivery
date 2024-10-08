import React, { useEffect, useState } from 'react'
import './AddItem.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddItem = () => {
    const api = 'http://localhost:4000/api/food/add'
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: '',
        description: '',
        category: 'Salad',
        price: '',
    })

    const inputHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData({...data, [name]: value})
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(image);
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('category', data.category)
        formData.append('price', Number(data.price))
        formData.append('image', image)

        const response = await axios.post(api, formData)

        if(response.data.success) {
            setData({
                name: '',
                description: '',
                category: 'Salad',
                price: '',
            })
            setImage(false)
            toast.success(response.data.message)
        } 
        else {
            toast.error(response.data.message)
        }
    }

    useEffect(()=> {
        console.log(data);
        console.log(image);
    },[])

    return (
        <div>
            <form onSubmit={onSubmit} className='addItem'>
                <div className="addItem-image input">
                    <p>Upload Image</p>
                    <label htmlFor='file'>
                        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                    </label>
                    <input required onChange={(e)=>setImage(e.target.files[0])} name='image' type="file" id='file' />
                </div>
                <div className="addItem-name input">
                    <p>Product name</p>
                    <input required value={data.name} onChange={inputHandler} name='name' type="text" placeholder='Type here' />
                </div>
                <div className="addItem-desc input">
                    <p>Product description</p>
                    <textarea required value={data.description} onChange={inputHandler} name='description' type="text" placeholder='Write content here' />
                </div>
                <div className="addItem-info">
                    <div className="addItem-category input">
                        <p>Product category</p>
                        <select onChange={inputHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noddles">Noddles</option>
                        </select>
                    </div>
                    <div className="addItem-price input">
                        <p>Product name</p>
                        <input required value={data.price} onChange={inputHandler} name='price' type="number" placeholder='$10' />
                    </div>
                </div>
                <button type='submit'>ADD</button>
            </form>
        </div>
    )
}

export default AddItem