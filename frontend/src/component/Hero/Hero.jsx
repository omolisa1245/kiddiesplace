import React from 'react'
import './Hero.css'
import Slider from "react-slick";
import hero_bg4 from '../../assets/hero_bg4.png'
import baby_bg2 from '../../assets/baby_bg2.png'
import toy_img3 from '../../assets/toy_img3.png'
import special_offer from '../../assets/special_offer.png'
import new_arrival_b4 from '../../assets/new_arrival_b4.png'
import { FaLongArrowAltRight } from "react-icons/fa";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        cssEase: "linear"
    };

    return (
        <div className='hero-container'>
            <div className="slider-container">
                <Slider {...settings}>
                    <div className='hero-bg-color'>
                        <div className="hero-holder">
                            <img className='special-offer' src={special_offer} alt="" />
                            <div className="hero-content">
                                <div className="hero-h4-layer"><h4>SEASONAL SALE - UP TO 60% OFF</h4></div>
                                <h1>Boys Complete set Out-fit</h1>
                                <span>Price from : $23</span>
                                <button>Shop now<FaLongArrowAltRight className='btn-arrow'/></button>
                            </div>
                             <img className='hero-image2' src={new_arrival_b4} alt="" />
                            <div className="hero-image">
                                
                                <img  src={hero_bg4} alt="" />
                            </div>
                        
                        </div>
                    </div>
                    <div>
                         <div className="hero-holder">
                            <img className='special-offer' src={special_offer} alt="" />
                            <div className="hero-content">
                                <div className="toy-h4-layer"><h4>Big Discount</h4></div>
                                <h1>Babys Toys And Accessories</h1>
                                <span>Flat 10% off on every baby cloth order above $20</span>
                                <button>Shop now<FaLongArrowAltRight className='btn-arrow'/></button>
                            </div>

                            <div className="toy-img">
                                <img className='toy-image' src={toy_img3} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                          <div className="hero-holder">
                            <img className='special-offer' src={special_offer} alt="" />
                            <div className="hero-content">
                                 <div className="hero-h4-layer"><h4>Up To 70% Off Our Product</h4></div>
                                <h1>Buy Our Amazing Baby Out-fit</h1>
                                <span>Price from : $23</span>
                                <button>Shop now<FaLongArrowAltRight className='btn-arrow'/></button>
                            </div>

                            <div className="baby-img">
                                <img className='baby-image' src={baby_bg2} alt="" />
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

          
        </div>
    )
}

export default Hero