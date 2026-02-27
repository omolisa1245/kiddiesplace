import React, { useState, useEffect } from 'react'
import "./Order.css"
import axios from "axios"
import { currency } from '../../App'

const Order = ({token}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () =>{

    if (!token) {
      return null
      
    }

    try {
      const response =  await axios.post("http://localhost:4000/api/order/list", {}, {Headers: {token}})

      
      if (response.data.success) {
        setOrders(response.data.orders)
        console.log(response.orders);
      }
      else{
        alert(response.data.message)
      }
      
    } catch (error) {
      
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/order/status", {orderId, status: event.target.value}, {headers:{token}});
      if (response.data.success) {
        await fetchAllOrders()
        
      }
    } catch (error) {
      console.log(error);
      alert(error.message)
      
      
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])
  
  return (
    <div className='order-holder'>
      <h3 className="order-title">All Orders</h3>
      <div className="order-container">
        {
          orders.map((order,index) =>(
            <div className='order-card' key={index}>
               <div className="order-details">
                <div className="user-order-details">
                  <p className="order-customer"><span>Customer</span>{order.address.firstName}{order.address.lastName}</p>
                  <p className="order-customer"><span>Tel:</span>{order.address.phone}</p>
                  <div className="order-address">
                    <span>Shipping Adr:</span><p>{order.address.city}{order.address.state}{order.address.country}</p>
                  </div>
                </div>

                
                <div className="order-item">
                  {
                    order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <p className="order-customer"><span>Product:</span>{item.name}</p>
                        <p className="order-customer"><span>Qty:</span>{item.quantity}</p>
                        <p className="order-customer"><span>Size</span>{item.size}</p>
                      </div>
                    ))
                  }
                </div>
                <div className="order-method">
                  <p className="order-customer"><span>ITems:</span>{order.items.length}</p>
                  <p className="order-customer"><span>Method of Method:</span>{order.payment}</p>
                  <p className="order-customer"><span>Payment:</span>{order.payment ? "Done" : "Pending"}</p>
                  <p className="order-customer"><span>Date:</span>{new Date(order.date).toLocaleString()}</p>
                </div>

                <h2 className="order-amount">{currency}{order.amount}</h2>
                <select onChange={(event) =>statusHandler(event, order._id)} value={order.status}  className="order-status">
                  <option value="Order placed">Order placed</option>
                  <option value="packing">packing</option>
                  <option value="shipping">shipping</option>
                  <option value="out of delivery">out of delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
               </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order