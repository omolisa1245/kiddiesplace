import React, { useState, useEffect } from 'react'
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import Order from './pages/Order/Order.jsx'
import Login from './component/Login/Login'
import axios from 'axios'
import List from './pages/List/List.jsx'




export const backendurl = " http://localhost:5000"
 export const currency = "$"
export const App = () => {
  const [token, setToken] = useState( localStorage.getItem("token" || "") )

 
  



  useEffect(() => {
   localStorage.setItem("token", token)

  }, [token])
     



  
  return (
    <div className='app-container'>
      {
        token === "" ? (<Login setToken={setToken} />) : (<div className="main-app"> <Navbar setToken={setToken} />
          <div className="app-content">
            <Sidebar setToken={setToken}  />
            <div className="page-content">
              <Routes>
                <Route path='/Add' element={<Add token={token} />} />
                <Route path='/List' element={<List token={token} />} />
                <Route path='/Order' element={<Order token={token} />} />
              </Routes>
            </div>
          </div>
        </div>
        )


      }
    </div>


  )
}

export default App;
