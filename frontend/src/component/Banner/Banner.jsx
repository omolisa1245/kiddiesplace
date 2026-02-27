import React from 'react'
import './Banner.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import banner_2 from '../../assets/banner_2.png'

const Banner = () => {
    return (
        <div className='banner-conatiner'>
            <div className="banner-content">
                <div className="banner-left">
                  <img src={banner_2} alt="" />
                </div>

                <div className="banner-right">
                    <h1>Fashion Meet Lifestyle</h1>
                    <p>High-Quality and stylish fashion for boys and girls. A completely new experience and
                        will turn an ordinary fashion into something exceptional.
                    </p>
                    <button>Shop now<FaLongArrowAltRight className='btn-arrow' /></button>

                </div>
            </div>
        </div>
    )
}

export default Banner