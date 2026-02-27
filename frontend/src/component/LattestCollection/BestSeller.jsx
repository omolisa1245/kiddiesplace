import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from "react-router-dom"

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [data, setData] = useState(products)
    const [bestSeller, setBestSeller] = useState([])
    useEffect(() => {
        const bestproduct = data.filter((item) => (item.bestseller));
        setBestSeller(bestproduct.slice(0, 4));
    }, [products])



    return (
        <div>

            <div className="product-container">
                <div className="list-header">
                    <h1>Best Product</h1>
                    <hr className='divider' />
                </div>

                <div className="product-grid">
                    {bestSeller.length > 0 ? (
                        bestSeller.map((product) => (
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

export default BestSeller