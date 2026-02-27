import React, { useContext, useState, useEffect } from 'react'
import './ProductDetails.css'
import { ShopContext } from '../../context/ShopContext'
import { useParams } from 'react-router-dom';
import RelatedProduct from '../../component/RelatedProduct/RelatedProduct';

const ProductDetails = () => {

  const {products, currency,addToCart} = useContext(ShopContext);
  const {productId} = useParams()
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [sizes, setSizes] = useState('')
  const [data, setData] = useState(products)
   

  const fetchProductData = async () => {
     data.map((item) =>{
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
      }
     })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])
  
  return productData ? (
    <div>
      <div className="product-container">
        <div className="product-content">
          <div className="product-images">
            <div className="thumbnail-containter">
             
                 {productData.image.map((item,index) =>(
                  <img onClick={() =>setImage(item)} src={item} key={index} alt="" className='thumbnail'/>
                ))}
              
            </div>
            <div className="main-image-containter">
              <img src={image}  alt="" className='main-image' />
            </div>
          </div>
          <div className="product-info">
             <h1 className="productname">{productData.name}</h1>
             <hr className='product-divider'/>
             <p className="product-price">{currency}{productData.price}</p>
             <p className="product-description">{productData.description}</p>
             <div className="size-selector">
              <p>Select size</p>
              <div className="size-buttons">
                  
                { productData.sizes.map((item, index) => (
                    <button key={index} onClick={()=>setSizes(item)} className={`size-button ${item === sizes ? 'acive-size' : ''}`}>{item}</button>
                 ))}
              
              </div>
             </div>

             <hr className='product-divider' />
             <div className="product-policy">
              <p>Free Delivery</p>
              <p>Seamless and secure payment</p>
              <p>Serveral payment option available</p>
             </div>
             <button onClick={() =>addToCart(productData._id, sizes)} className='add-to-cart-btn'>ADD TO CART</button>
          </div>
        </div>

        <div className="descriptin-review-section">
          <div className="tabs">
            <b className="tab">Description</b>
            <p className="tab">Review</p>
          </div>
          <div className="desciption-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, assumenda error. Nulla, esse a? Cum, velit. Similique vero dolore odio expedita modi nesciunt nulla voluptates quisquam doloribus, odit, aliquam corporis!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem adipisci hic accusantium ipsum aperiam explicabo esse tenetur quibusdam eligendi aut delectus modi officiis a dolorum, porro velit magnam beatae debitis.</p>
          </div>
        </div>
       <RelatedProduct category={productData.category}/> 
      </div>
    </div>
  ) : (<div>No product is available in this category</div>)
}

export default ProductDetails