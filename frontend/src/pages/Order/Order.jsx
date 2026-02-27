import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../context/ShopContext'
import axios from 'axios'
import './Order.css'

const Order = () => {

    const { token, currency } = useContext(ShopContext)
    const [orderData, setOrderData] = useState([])
    // console.log(orderData);


    const loadOrderData = async () => {
        try {
            if (!token) {
                return null

            }

            const response = await axios.post("https://kiddiesplace.vercel.app/api/order/userorder", {}, { headers: { token } });
            console.log(response.data);


            if (response.data.success) {
                let allOrdersItems = [];

                response.data.orders.map((order) => {
                    // console.log(order);

                    order.items.map((item) => {

                        item["status"] = order.status;
                        item["payment"] = order.payment;
                        item["paymentMethod"] = order.paymentMethod;
                        item["date"] = order.date;

                        allOrdersItems.push(order)

                    })
                })

                setOrderData(allOrdersItems.reverse());
                console.log(orderData);





            }

        } catch (error) {
            console.log(error);


        }
    }

    useEffect(() => {
        loadOrderData()
    }, [token])


    return (
        <div>
            <div className="order-container">
                <div className="order-title">
                    <h1>My order</h1>
                </div>
                <div>



                    {orderData.map((order, index) => (

                        <div key={index} className="order-item-container">
                            <div className="order-item-details">
                                {
                                    order.items.map((item, index) => {
                                        return <>

                                            <img src={item.image} className='order-item-image' alt="" />
                                            <div key={index} className='order-left'>
                                                <div className="order-content">
                                                    <p className="order-item-name">{item.name}</p>
                                                    <div className="order-item-info">
                                                        <p>{currency}{item.price}</p>
                                                        <p>quantity{item.quantity}</p>
                                                        <p>Size{item.size}</p>
                                                    </div>
                                                    <p className='order-item-date'>Date: <span>{new Date(item.date).toLocaleString()}</span></p>
                                                    <p className='order-item-payment'>Payment: <span>{item.paymentMethod}</span></p>

                                                </div>


                                                <div className="order-item-status-container">
                                                    <div className="order-item-status">
                                                        <p className='status-indicator'></p>
                                                        <p>{item.status}</p>
                                                    </div>
                                                    <button onClick={loadOrderData} className="track-order-btn">Track Order</button>
                                                </div>
                                            </div>

                                        </>
                                    })
                                }

                            </div>


                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Order