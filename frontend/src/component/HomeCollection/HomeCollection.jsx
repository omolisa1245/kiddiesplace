import React, { useContext, useState, useEffect } from 'react'
import './HomeCollection.css'
import { ShopContext } from '../../context/ShopContext'
import b_img10 from '../../assets/b_img10.png'
import f_img12 from '../../assets/f_img12.png'
import f_img13 from '../../assets/f_img13.png'
import { IoIosStar } from "react-icons/io";


import { Link } from "react-router-dom"

const HomeCollection = () => {

    const { products} = useContext(ShopContext);
    const [homeProduct, setHomeProduct] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Boys');

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(18); // Assuming a max price of 1000 for example
     
    const [data, setData] = useState(products)
    const handleMinPriceChange = (e) => {
        setMinPrice(Number(e.target.value));
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(Number(e.target.value));
    };

    const filteredProducts = data.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
    );


    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (event) => {
        const { value } = event.target;
        setSelectedOption((prevSelected) => (prevSelected === value ? null : value));
    };


    useEffect(() => {
        setHomeProduct(data.slice(7, 15))
    }, [products])


    const [filterItems, setFilterItems] = useState([]);

    const handleFilterClick = (category) => {
        if (!category) {
            setFilterItems(homeProduct)
        } else {
            const newFilteredList = products.filter(product => product.category === category );
            setFilterItems(newFilteredList);
            


        }

    };

    return (
        <div>
            <div className="product-container">
                <div className="list-header">
                    <h1>Our Collection</h1>
                    <hr className='divider' />
                </div>

                <div className="product-grid-containter">

                    <div className="product-grid-left">
                        <div className="product-input">
                            <input type="text" placeholder='search' />
                            <button>SEARCH</button>
                        </div>
                        <hr className='divider-p' />
                        <div className="product-discount">
                            <h5>ONE WEEK ONLY</h5>
                            <h3>FREE SHIPPING</h3>
                            <p>On any order over $300</p>
                            <button>START SHOPING</button>
                        </div>
                        <hr className='divider-p' />

                        <div className="range">
                            {`max: `}
                            <input type="range" id='max' min={1} max={400}
                                value={maxPrice} onChange={handleMaxPriceChange}
                            />
                            <span>${maxPrice}</span>
                        </div>
                        <div className="range">
                            {`min: `}
                            <input type="range" id='min' min={1} max={400} step={1}
                                value={minPrice} onChange={handleMinPriceChange}
                            />
                            <span>${minPrice}</span>


                        </div>



                           
                        <div className="tags">
                            <div className="tag-t">
                                <h3>TAGS</h3>
                                <hr className='tag-topic' />
                            </div>

                            <div className="tag-holder">
                                <button onClick={() => handleFilterClick('Shoe')}>Shoe</button>
                                <button onClick={() => handleFilterClick('Pants')}  >Pants</button>
                                <button onClick={() => handleFilterClick('Toys')}>Toys</button>
                            </div>
                            <div className="tag-holder">
                                <button onClick={() => handleFilterClick('Bag')}>Bags</button>
                                <button onClick={() => handleFilterClick('Wrist watch')}>Wrist Watch</button>
                                <button onClick={() => handleFilterClick('Cap')}>Cap</button>
                            </div>
                        </div>
                        <hr className='divider-p' />

                        <div className="new-product">
                            <div className="new-product-topic">
                                <h3>NEW PRODUCTS</h3>
                                <hr className='new-topic' />
                            </div>

                            <div className="new-product-content">
                                <img src={b_img10} alt="" />
                                <div className="new-product-details">
                                    <h4>SUMMER BOYS</h4>
                                    <span>SWEATER</span>
                                    <p>$ 124</p>
                                </div>
                            </div>
                            <div className="new-product-content">
                                <img src={f_img12} alt="" />
                                <div className="new-product-details">
                                    <h4>SUMMER BOYS</h4>
                                    <span>JEAN TOP</span>
                                    <p>$ 124</p>
                                </div>
                            </div>
                            <div className="new-product-content">
                                <img src={f_img13} alt="" />
                                <div className="new-product-details">
                                    <h4>GIRLS GOWN</h4>
                                    <span>GOWN</span>
                                    <p>$ 124</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="product-grid-holder">
                        <div className="products-grid">
                            {filterItems.map((product) => (
                                <div className="products-card" key={product._id}>
                                    <div className="products-image">
                                        <Link to={`/product/${product._id}`} >
                                            <img src={product.image[0]} alt="" />
                                        </Link>
                                    </div>
                                    <h3>{product.name}</h3>
                                    <span>{product.description}</span>
                                    <p>$ {product.price}</p>
                                </div>
                            ))}
                            {filteredProducts.map((product) => (
                                <div className="products-card" key={product._id}>
                                    <div className="products-image">
                                        <Link to={`/product/${product._id}`} >
                                            <img src={product.image[0]} alt="" />
                                        </Link>
                                    </div>
                                    <h3>{product.name}</h3>
                                    <span>{product.description}</span>
                                    <p>$ {product.price}</p>
                                </div>
                            ))}



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeCollection