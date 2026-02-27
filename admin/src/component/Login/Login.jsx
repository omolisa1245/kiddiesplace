import React, { useState } from 'react'
import './Login.css'
import input3 from '../../assets/input3.png'
import { CiLock } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import { backendurl } from '../../App';
import axios from 'axios'

const Login = ({setToken, getUserData}) => {



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const onSubmitHandler = async (e)=>{
       try {
         e.preventDefault()

         const response = await axios.post("http://localhost:4000/api/user/admin", {email,password})
         console.log(response);
         
         if (response.data.success) {
            setToken(response.data.token)
            getUserData()
         }else{
            alert(response.data.message)
         }

        // console.log(email,passwprd);
         
       } catch (error) {
        console.log(error);
        
       }
    }

    return (
        <div className='login-container'>
            <div className="login-background">
                <div className="login-top">
                    <BsCartPlus className='cart-background'/>
                </div>
                 
                <div className="login-down">
                    <h2>Admin Login</h2>
                    <form  onSubmit={onSubmitHandler}>
                        <div className="form-group-input">
                            <div className="name-input">
                                <img src={input3} alt="" />
                                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='Enter your email here..' required />
                            </div>
                            <div className="name-input1">
                                <CiLock className='password-icon'/>
                                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password here...'  required/>
                            </div>
                        </div>
                        <button className='form-button' type='submit'>Enter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login