import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Verify = () => {

    const {setCartItems, token} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');


    console.log(success,orderId);
    

    const verifyPayment = async () =>{
        try {
            if (!token) {
                return null
            }

            const response = await axios.post("https://kiddiesplace.vercel.app/api/order/verify", {success, orderId}, {headers:{token}});
              console.log(response.data);
              
            if (response.data.success) {
                setCartItems({});
                navigate('/order')
                alert("payment successful")

                
            }else{
                navigate('/cart')
                alert('payment failed')
            }
        } catch (error) {
            console.log(error);
            alert(error.message)
            
        }
    }

    useEffect(() => {
      verifyPayment()
    }, [token])
    
  return (
    <div></div>
  )
}

export default Verify