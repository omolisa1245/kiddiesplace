import React, { useContext, useState } from 'react'
import './Cart.css'
import { ShopContext } from '../../context/ShopContext'
import { useEffect } from 'react'
import { RiDeleteBin2Line } from "react-icons/ri";
import CartTotal from '../../component/CartTotal/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) return;

    if (!cartItems || typeof cartItems !== 'object') {
      setCartData([])
      return;
    }

    const tempData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>

      Object.entries(sizes).filter(([, quantity]) => quantity > 0).map(([sizes, quantity]) => ({

        _id: itemId,
        sizes,
        quantity
      }))
    )

    setCartData(tempData)

  }, [cartItems, products])

  return (
    <div>
      <div className="cart-content-container">
        {
          cartData.map((item, index) => {
            const productData = products.find(product => product._id === item._id)
            return (
              <div className='cart-item' key={index}>
                <div className="cart-item-info">
                  <img src={productData.image[0]} alt="" className='product-cart-image' />

                  <div className="product-cart-details">
                    <p className="product-cart-name">{productData.name}</p>
                    <div className="product-cart-price">
                      <p>{currency}{productData.price}</p>
                      <p className="size">{productData.sizes[0]}</p>
                    </div>

                  </div>
                </div>

                <input type="number" id="" className='quantity-input' min={1} defaultValue={item.quantity}
                  onChange={(e) => e.target.value === "" || e.target.value === 0 ? null : updateQuantity(item._id, item.sizes, Number(e.target.value))} />

                <RiDeleteBin2Line className='delete-icon' onClick={() => updateQuantity(item._id, item.sizes, 0)} />
              </div>


            )
          })
        }
        
        <div className="checkout-container">
          <div className="check-box">
            <CartTotal />

            <div className="checkout-button-container">
              <button onClick={()=>navigate('/Checkout')} className="checkout-button">PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart