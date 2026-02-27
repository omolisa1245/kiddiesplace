import React from 'react'
import './Footer.css'

import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

import f_img10 from "../../assets/f_img10.png"
import mt_img1 from "../../assets/mt_img1.png"
import fshoe_img5 from "../../assets/fshoe_img5.png"
import watch5 from "../../assets/watch5.png"

const Footer = () => {
    return (
        <div className='footer-conateiner'>
            <div className="footer-holder">
                <div className="footer-top">
                    <div className="footer-top1">
                        <h3>About us</h3>
                        <p>KiddiesPlace is an indigenous premium brand for quality children’s clothing,
                            shoes and accessories. The brand was founded by Adenike Ogunlesi in 1998 as a
                            solution to the unavailability of quality kids’ clothing and to showcase the
                            possibilities that abound in Nigeria.
                        </p>

                        <div className="footer-contact-holder">
                            <div className="footer-contact">
                                <IoCallSharp className='call' />
                                <span>+2348055380547</span>
                            </div>
                            <div className="footer-contact">
                                <MdEmail className='call' />
                                <span>kiddiesplace@gmail.com</span>
                            </div>
                        </div>

                        <div className="footer-input">
                            <input type="text" placeholder='enter your e-mail' />
                            <button>Send</button>
                        </div>
                    </div>
                    <div className="footer-top2">
                        <h3>Lattest tweet</h3>
                        <p>
                            It is very good quality and looks even better in real life but only problem was there was
                            some complications while shipping the bags but other than that its so good and very
                            affordable ✨
                        </p>
                        <p>
                            It is very good quality and looks even better in real life but only problem was there was
                            some complications while shipping the bags but other than that its so good and very
                            affordable ✨
                        </p>
                        <p>
                            It is very good quality and looks even better in real life but only problem was there was
                            some complications while shipping the bags but other than that its so good and very
                            affordable ✨
                        </p>


                    </div>
                    <div className="footer-top3">
                        <h3>Our Gallery</h3>
                        <div className="gallery1">
                            <img src={f_img10} alt="" />
                            <img src={mt_img1} alt="" />
                        </div>
                        <div className="gallery1">
                            <img src={fshoe_img5} alt="" />
                            <img src={watch5} alt="" />
                        </div>

                    </div>
                </div>

              
            </div>
              <div className="footer-bottom">
                    <span>© 2025 KiddiesPlace, Inc. All rights reserved.</span>
                </div>

        </div>
    )
}

export default Footer