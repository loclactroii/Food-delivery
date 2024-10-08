import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../components/context/StoreContext'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const orderId = searchParams.get('orderId')
    const success = searchParams.get('success')
    const { api } = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyOrder = async () => {
        const response = await axios.post(api+'/api/order/verify',{orderId, success})
        if(response.data.success) {
            navigate('/myorders')
        }
        else {
            navigate('/')
        }
    }

    useEffect(() => {
        verifyOrder()
        console.log(orderId, success);
        
    },[])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify