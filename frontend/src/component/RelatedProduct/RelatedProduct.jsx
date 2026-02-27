import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useState } from 'react';
import {Link} from "react-router-dom"

const RelatedProduct = ({ category }) => {

    const { products } = useContext(ShopContext);
    const [RelatedProduct, setRelatedProduct] = useState([])

    const related = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
    )

    useEffect(() => {
        setRelatedProduct(related.slice(0, 4))
    }, [])

    return (
        <div className='related-container'>
            <div className="productr-container">
                <div className="list-header">
                    <h1>Related Product</h1>
                    <hr className='divider' />
                </div>

                <div className="product-grid">
                    {RelatedProduct.length > 0 ? (
                        RelatedProduct.map((product) => (
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

export default RelatedProduct