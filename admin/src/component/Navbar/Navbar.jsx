import React, { useRef, useState } from 'react'
import './Navbar.css'
import { MdSearch } from "react-icons/md";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import icon_profile from '../../assets/icon_profile.png'
import { IoIosArrowDown } from "react-icons/io";
 import { BiFoodMenu } from "react-icons/bi";
 import { IoAddCircleSharp } from "react-icons/io5";
 import { BsCartPlus } from "react-icons/bs"
 import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Navbar = ({setToken}) => {

    const [open, setOpen] = useState(false)

    const navigate = useNavigate();



    return (
        <div className='navbar-container'>
            <div className="navbar-left">
                <div className="input-btn">
                    <button><MdSearch className='nav-input-icon' /></button>
                    <input type="text" placeholder='Enter item here....' />
                </div>

            </div>

            <div className="navbar-right">
              
                <div className="navbar-right-profile">
                    <img className='icon-pro' src={icon_profile} alt="" />
                    <span>name</span>
                    <IoIosArrowDown onClick={()=>setOpen(!open)} className='nav_pro_icon' />

                  { open && (
                      <div className="drop_down">
                        <ul>
                            <div className="add-background"></div>
                            <li onClick={()=>navigate('/Foodlist')}><BiFoodMenu  className='dropdown-icon'/>FoodList</li>
                            <li onClick={()=>navigate('/AddFood')}><IoAddCircleSharp  className='dropdown-icon' />AddFood</li>
                            <li onClick={()=>navigate('/Order')}> <BsCartPlus  className='dropdown-icon' />Order</li>
                            <li onClick={()=>setToken('')}><IoLogOutOutline  className='dropdown-icon'/>Log Out</li>
                        </ul>
                    </div>
                  )

                  }

                </div>

            </div>

        </div>
    )
}

export default Navbar