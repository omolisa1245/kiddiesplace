import React, { useContext, useState, useEffect } from 'react'
import './Login.css'
import { ShopContext } from '../../context/ShopContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const [currState, setCurrState] = useState('Login')
  const { token, setToken,getUserData } = useContext(ShopContext)

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
   const navigate = useNavigate();



  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currState === "Sign up") {
        const response = await axios.post("http://localhost:4000/api/user/register", {email, name, password})

         if (response.data.success) {
                setToken(response.data.token);
                getUserData()
                localStorage.setItem("token", response.data.token);
             
            }
            else {
                alert(response.data.message)
            }
        
      }
      else{
        const response = await axios.post("http://localhost:4000/api/user/login", {email, password})
        
         if (response.data.success) {
                setToken(response.data.token);
                getUserData()
                localStorage.setItem("token", response.data.token);
            
            }
            else {
                alert(response.data.message)
            }
      }




    } catch (error) {
      console.log(error);
      alert(error.message)
      
      
    }

   
  }


   
    useEffect(() => {
     if (token) {
        navigate("/")
        
     }
    }, [token])
    
  return (
    <div className='login-container'>
      <form onSubmit={onSubmitHandler} className='form-container1'>
        <div className="form-header">
          <h3 className='form-title'>{currState}</h3>
        </div>

        {
          currState === "Login" ? "" : (<input onChange={(e) =>setName(e.target.value)} value={name} type="text" className='form-input' placeholder='Name' required />)
        }

        <input onChange={(e)=> setEmail(e.target.value)} value={email} type="text" className='form-input' placeholder='Email' required />
        <input onChange={(e)=> setPassword(e.target.value)} value={password}  type="password" className='form-input' placeholder='Password' required />


        <div className="form-footer">

          {
            currState === 'Login' ? (
              <span>Don't have an account ? <p className='toggle-state' onClick={() => setCurrState('Sign up')}>Create an Account</p> </span>
            ) : (
              <span>Already have an account ?<p className='toggle-state' onClick={() => setCurrState('Login')}>Login Here</p></span>
            )
          }
          <p className='forget-pass'>Forget Password</p>
        </div>

        <button type='submit' className="form-button">
          {
            currState === 'Login' ? "Sign in" : "Sign up"
          }
        </button>
      </form>
    </div>
  )
}

export default Login