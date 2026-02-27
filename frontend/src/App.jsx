import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Cart from './pages/Cart/Cart'
import Collection from './pages/Collection/Collection'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Navbar from './component/Navbar/Navbar'
import Footer from './component/Footer/Footer'
import Checkout from './pages/Checkout/Checkout'
import Order from './pages/Order/Order'
import Verify from './pages/Verify'



export const backendUrl = "http://localhost:4000"

const App = () => {
    return (
        <div>
            <Navbar/>
           <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/category/:category' element={<Collection/>} />
              <Route path='/product/:productId' element={<ProductDetails/>} />
               <Route path='/checkout' element={<Checkout/>} />
               <Route path='/order' element={<Order/>} />
               <Route path='/verify' element={<Verify/>} />
           </Routes>
           <Footer/>
        </div>
    )
}

export default App