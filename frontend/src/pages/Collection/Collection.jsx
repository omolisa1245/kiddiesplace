import React, { useContext, useState } from 'react'
import './Collection.css'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import baby_bac from '../../assets/baby_bac.jpg'
import boy_bac from '../../assets/boy_bac.jpg'
import girl_bac from '../../assets/girl_bac.jpg'
import { Link } from 'react-router-dom'

const Collection = () => {

  const { products,searchTerm } = useContext(ShopContext);
  const { category } = useParams();
  const [data, setData] = useState(products)



  const filteredProduct = data.filter((product) => product.category.toLowerCase() === category.toLowerCase()
  && product.name.toLowerCase().includes(searchTerm.toLowerCase())
)




  const bannerImages = {
    Boys: boy_bac,
    Girls: girl_bac,
    Baby: baby_bac,
  }
  return (

    // banner section
    <div className='collection-container'>
      <div className="banner">
        {bannerImages[category] ? (
          <img className='banner-img' src={bannerImages[category]} alt="" />
        ) : (
          <p>No banner for this category</p>
        )}
      </div>

      <div className="product-container">
        <div className="list-header">
          <h1>Our Collection</h1>
          <hr className='divider' />
        </div>
      
        
            <div className="product-grid">
              {filteredProduct.length > 0 ? (
                filteredProduct.map((product) => (
                  <div className="product-card" key={product._id}>
                    <div className="product-image">
                      <Link to={`/product/${product._id}`} >
                        <img src={product.image[0]} alt="" />
                      </Link>
                    </div>
                    <h3>{product.name}</h3>
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

export default Collection