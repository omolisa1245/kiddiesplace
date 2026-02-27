import React, { useContext, useState } from 'react'
import './Navbar.css'

import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPinterestSquare } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdWifiCalling } from "react-icons/md";
import logo from "../../assets/logo.png"
import icon_profile from "../../assets/icon_profile.png"
import { BsCartCheck } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext';
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {

    const navigate = useNavigate();
    const { updateSearchTerm, getCartCount, token, setToken,userData } = useContext(ShopContext)
     const [open, setOpen] = useState(false)

    const handleNavigation = (path) => {
        navigate(path)
    }


    const [searchInput, setSearchInput] = useState('')

    const handleSearch = () => {
        updateSearchTerm(searchInput)
    }

    return (
        <div className='navbar-container'>
            <div className="navbar-holder">
                <div className="navbar-top">
                    <div className="navbar-top-right">
                        <FaInstagram className='nav-social-icon' />
                        <FaLinkedin className='nav-social-icon' />
                        <FaSquareXTwitter className='nav-social-icon' />
                        <FaPinterestSquare className='nav-social-icon' />
                    </div>

                    <div className="navbar-top-middle">
                        <div onClick={() => handleNavigation('/category/Boys')} className="nav-link">Boys</div>
                        <div onClick={() => handleNavigation('/category/Girls')} className="nav-link">Girls</div>
                        <div onClick={() => handleNavigation('/category/Baby')} className="nav-link">Baby</div>
                    </div>

                    <div className="navbar-top-left">

                        <div className="nav-email">
                            <MdOutlineEmail className='nav-social-icon' />
                            <span>kiddiesplace@gmail.com</span>
                        </div>
                        <div className="nav-email">
                            <MdWifiCalling className='nav-social-icon' />
                            <span>+2348055380547</span>
                        </div>
                    </div>
                </div>

                <div className="navbar-down">
                    <Link to={'/'} >
                        <img src={logo} alt="" />
                    </Link>
                    <div className="nav-down-input">
                        <div className="inputholder">
                            <IoSearchSharp className='search-icon' />
                            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder='Search item here..' />
                        </div>

                        <button onClick={handleSearch}>Search</button>
                    </div>

                    <div className="nav-down-right">
                      
                        <div className="cart-btn">
                            <Link to={'/cart'}>
                                <BsCartCheck className='cart-icon' />
                            </Link>
                            <p>{getCartCount()}</p>
                        </div>

                        {
                            localStorage.getItem("token") ? (
                                <div className="profile-dropdown">
                                    <img src={icon_profile} alt="" />
                                    <IoIosArrowDown  onClick={()=>setOpen(!open)} className='nav-arrow' />

                                  { open && ( <div className="drop-down-container">
                                        <div className="layer"></div>
                                        <ul className='drop-down-menu'>
                                            <li onClick={() =>navigate('/')}>Home</li>
                                            <li onClick={() =>navigate('/Order')}>Orders</li>
                                           <span onClick={() =>{ localStorage.removeItem("token"); window.location.replace('/')}} className='drop-down-btn'>Log out</span>
                                    
                                        </ul>
                                    </div>)}
                                </div>
                            ) : (<button onClick={() => navigate('/Login')}>Sign in</button>)
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar