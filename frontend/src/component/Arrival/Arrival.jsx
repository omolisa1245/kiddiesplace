import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from "react-router-dom"
const Arrival = () => {


    const { products } = useContext(ShopContext);

    const [Arrival, setArrival] = useState([])
    const [data, setData] = useState(products)
  

    useEffect(() => {
        setArrival(data.slice(72, 76))
    }, [products])

    return (
        <div className='arrival-holder'>
            <div className="product-container">
                <div className="list-header">
                    <h1>New Arrivals</h1>
                    <hr className='divider' />
                </div>

                <div className="product-grid">
                    {Arrival.length > 0 ? (
                        Arrival.map((product) => (
                            <div className="product-card" key={product._id}>
                                <div className="product-image">
                                    <Link to={`/product/${product._id}`} >
                                        <img src={product.image[0]} alt="" />
                                    </Link>
                                </div>
                                <h3>{product.name}</h3>
                                <span>{product.description}</span>
                                <p>$ {product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No product is found in this categories</p>
                    )}


                </div>
            </div>
        </div>
    )
}

export default Arrival