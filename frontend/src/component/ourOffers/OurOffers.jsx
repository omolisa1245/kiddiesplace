import React from 'react'
import './OurOffer.css'
import delivery_b from '../../assets/delivery_b.png'
import gift from '../../assets/gift.png'
import support from '../../assets/support.png'
import protection from '../../assets/protection.png'

const OurOffers = () => {
    return (
        <div className='our-offers'>
             <div className="hero-offers">
                <div className="delivery">
                   <img src={delivery_b} alt="" />
                   <h3>World Wide Delivery</h3>
                   <span>We offer delivery to any where you want to delivery to</span>
                </div>
                <div className="delivery">
                   <img src={gift} alt="" />
                   <h3>Discoount Program</h3>
                   <span>We offer discount to all our regular customer</span>
                </div>
                <div className="deliver">
                   <img  src={support} alt="" />
                   <h3>24Hrs Services</h3>
                   <span>Our custmer service is always available to attend to you</span>
                </div>
                <div className="deliver">
                   <img  src={protection} alt="" />
                   <h3>Customer Protection</h3>
                   <span>We offer return services incase of damages product</span>
                </div>
            </div>
        </div>
    )
}

export default OurOffers