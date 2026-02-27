import React from 'react'
import './Review.css'
import student_5 from '../../assets/student_5.jpeg'
import student_2 from '../../assets/student_2.jpeg'
import student_6 from '../../assets/student_6.jpeg'
import student_7 from '../../assets/student_7.jpeg'
import quote from '../../assets/quote.png'

const Review = () => {
    return (
        <div className='review-container'>
            <h2>Our Customer Review</h2>
            <div className="review-card-holder">
                <div className="produc-card">
                    <div className="produc-image">
                        <img src={student_5} alt="" />
                    </div>
                    <h4>Mrs Adekunle</h4>
                    <p>
                        Great quality tailoring great fabric. Simple sophistication. Wish it had a headband but
                        regardless, recommend it. It's your money's worth!
                    </p>
                    <img className='quote' src={quote} alt="" />
                </div>
                <div className="produc-card">
                    <div className="produc-image">
                        <img src={student_2} alt="" />
                    </div>
                    <h4>Mr Seun</h4>
                    <p>
                        My daughter loved it from just sighting it. Great tailoring, great fit and great color. 
                        Love ruffntumblekids always.th!
                    </p>
                    <img className='quote' src={quote} alt="" />
                </div>
                <div className="produc-card">
                    <div className="produc-image">
                        <img src={student_6} alt="" />
                    </div>
                    <h4>Mrs Chioma</h4>
                    <p>
                        Well crafted, good dress, the color of the dress is not just a bright tone; 
                        so it needs to be accessorised. I'm happy with the dress because it's not everytime we should wear pink 😉.
                    </p>
                    <img className='quote' src={quote} alt="" />
                </div>
                <div className="produc-card">
                    <div className="produc-image">
                        <img src={student_7} alt="" />
                    </div>
                    <h4>Mrs Smith</h4>
                    <p>
                       Top notch customer service, speedy delivery and excellent quality. 
                       I love the look and feel of the shirt. My boy loves it too.
                    </p>
                    <img className='quote' src={quote} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Review