import React, { useContext, useState, useEffect } from 'react'
import './Checkout.css'
import Stripe from '../../assets/stripe.png'
import razorpay from '../../assets/razorpay.png'
import CartTotal from '../../component/CartTotal/CartTotal'
import { ShopContext } from '../../context/ShopContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {


    const { currency, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)


    const navigate = useNavigate()
    const [method, setMethod] = useState("COD")
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        address: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(data => ({ ...data, [name]: value }));

    };


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];


            for (const itemId in cartItems) {
                for (const item in cartItems[itemId]) {
                    if (cartItems[itemId][item] > 0) {


                        const itemInfo = products.find((product) => product._id === itemId)
                        console.log(itemInfo);

                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[itemId][item]
                            orderItems.push(itemInfo)

                        }

                    }
                }
            }






            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            };



            switch (method) {
                case "cod":
                    const response = await axios.post("http://localhost:4000/api/order/place",
                        orderData, { headers: { token } }
                    );
                    console.log(orderData);


                    if (response.data.success) {
                        setCartItems({})
                        navigate('/order')
                    }
                    else {
                        alert(response.data.message)
                    }

                    // console.log(response.data);

                    break;

                case 'stripe':
                    const responseStripe = await axios.post("http://localhost:4000/api/order/stripe", orderData, { headers: { token } });
                    console.log(responseStripe.data);

                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)

                    } else {
                        alert(responseStripe.data.message)
                    }
                default:
                    break;
            }




        } catch (error) {
            console.log(error);
            alert(error.message)


        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="form-container">
            <div className='form-holder'>
                <div className="form-left">
                    <fieldset className='payment-method'>
                        <legend>Payment option</legend>
                        <div className="payment-options">
                            <div onClick={() => setMethod("stripe")} className={`payment-option ${method === "stripe" ? "selected" : ""}`}>
                                <img className='payment-logo' src={Stripe} alt="" />
                            </div>

                            <div onClick={() => setMethod("razorpay")} className={`payment-option ${method === "razorpay" ? "selected" : ""}`}>
                                <img className='payment-logo' src={razorpay} alt="" />
                            </div>
                            <div onClick={() => setMethod("cod")} className={`payment-option ${method === "cod" ? "selected" : ""}`}>
                                <span className='payment-text'>CASH ON DELIVERY</span>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="form-title">
                    <h2>Shipping Address</h2>
                </div>
                <div className="form-row">
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className='form-input1' placeholder='Firstname' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className='form-input1' placeholder='Lastname' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} type="text" className='form-input2' placeholder='Email Address' />
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="text" className='form-input2' placeholder='Phone Number' />
                <input required onChange={onChangeHandler} name='address' value={formData.address} type="text" className='form-input2' placeholder='Address' />
                <div className="form-row">
                    <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" className='form-input1' placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" className='form-input1' placeholder='State' />
                </div>
                <div className="form-row">
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" className='form-input1' placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" className='form-input1' placeholder='Country' />
                </div>


            </div>
            <div className="form-right">
                <CartTotal />
                <button type='submit' className='form-submit'>Place Order</button>

            </div>

        </form>
    )
}

export default Checkout