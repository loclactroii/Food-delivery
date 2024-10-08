import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import {toast} from 'react-toastify'

const LoginPopup = () => {
    const { setShowLoginPopup, api, setToken, setCartItems } = useContext(StoreContext)
    const [state, setState] = useState('Sign Up')
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const inputHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(api + `/api/user${state==='Sign Up'?'/register':'/login'}`, user)
        if(response.data.success) {
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setUser({
                name: '',
                email: '',
                password: ''
            })
            setShowLoginPopup(false)
        }
        else {
            toast.error(response.data.message)
        }

    }


    return (
        <div className='login-popup'>
            <form onSubmit={onSubmit}>
                <div className="top">
                    <h2>{state}</h2>
                    <img onClick={() => setShowLoginPopup(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="inputs">
                    {state === 'Sign Up' ? <input onChange={inputHandler} name='name' type="text" placeholder='Your name' required /> : <></>}
                    <input onChange={inputHandler} name='email' type="email" placeholder='Your email' required />
                    <input onChange={inputHandler} name='password' type="password" placeholder='Your password' required />
                </div>
                <button type='submit'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                <label htmlFor="privacy">
                    <input type="checkbox" required />
                    By continuing, I agree to the terms of use & privacy policy
                </label>
                {state === 'Sign Up'
                    ? <p className='bottom'>Already have an account? <span onClick={() => setState('Login')}>Login here</span></p>
                    : <p className='bottom'>Create a new account? <span onClick={() => setState('Sign Up')}>Click here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup