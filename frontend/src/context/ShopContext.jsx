import { createContext, useState,useEffect } from "react";
import { product } from "../assets/asset";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { use } from "react";


export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

    const currency = "$"
    const delivery_fee = 10

    const [products, setProducts] = useState(product)
    const [data, setData] = useState([])
    const [userData, setUserData] = useState(false)
      const [searchTerm, setSearchTerm] = useState('')
      const [cartItems, setCartItems] = useState([])
      

      

      const [token, setToken] = useState("")



    const updateSearchTerm = (term) =>{
       setSearchTerm(term)  
    } 




    const addToCart = async (itemId, sizes) => {
        if (!sizes) {
            alert('you must select product size to continue')
        }

        const cartData = {...cartItems}

        if (!cartData[itemId]) {
            cartData[itemId] = {[sizes] : 1}
        }
        else{
            cartData[itemId][sizes] = (cartData[itemId][sizes] || 0) + 1
        }
        setCartItems(cartData)

        console.log(`product added to cart : itemId - ${itemId}, sizes ${sizes}`);
        alert('Product added to cart')


        if (token) {
          try {
              await axios.post("https://kiddiesplace.vercel.app/api/cart/add", {itemId, sizes}, {headers: {token}})


          } catch (error) {
            console.log(error);
            alert(error.data.message)
            
            
          }
            
        }
    }





    const getCartCount = () => {
        let totalCount = 0;
      for(  const items in cartItems){
         for(const item in cartItems[items]){
            if (cartItems[items][item] > 0) {
                totalCount += cartItems[items][item]
            }
            
         }
        }
         return totalCount;
    }


    const updateQuantity = async (itemId, sizes, quantity) =>{
       let cartData = structuredClone(cartItems)
       cartData[itemId][sizes] = quantity;
       setCartItems(cartData)


       if (token) {
         try {
          await axios.post("https://kiddiesplace.vercel.app/api/cart/update", {itemId, sizes, quantity}, {headers: {token}})  

         } catch (error) {
          console.log(error);
          alert(error.message)
          
          
         }      
       }
    }




    const getCartAmount = () => {
        let totalAmount = 0;

        for( const itemId in cartItems){
            const itemInfo = products.find((product) => product._id === itemId)

            if (itemInfo) {
                for(const sizes in cartItems[itemId]){
                    totalAmount += itemInfo.price * cartItems[itemId][sizes]
                }
            }
        }

        return totalAmount
    }


    const getProductData = async () =>{
      try {
          const response = await axios.get("https://kiddiesplace.vercel.app/api/product/list")
           console.log(response.data)
        
          
      } catch (error) {
        console.log(error);
        alert(error.message)
        
        
      }
    }


    const getUserCart = async (token) =>{
        try {
          const response  = await axios.post("https://kiddiesplace.vercel.app/api/cart/get",{}, {headers: {token}})
          console.log(response.data);
          
          if (response.data.success) {
            setCartItems(response.data.cartData)
            
          }
        } catch (error) {
          console.log(error);
          alert(error.message)
          
          
        }
    }

    


    const getUserData = async () =>{
      
        try {
          const response  = await axios.get("https://kiddiesplace.vercel.app/api/user/data")
          console.log(response);
          
          if (response.data.success) {
            setUserData(data.userData)
            
          }
          else{
            alert(data.message)
          }
        } catch (error) {
          console.log(error);
          alert(error.message)
          
          
        }
    }

    

    useEffect(() => {
     getProductData()

    }, [])

  
    useEffect(() => {
     if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"))

      
     }
    }, [])
    




   
   
    const value ={
       products,getUserData,userData,data,delivery_fee,cartItems,setCartItems,searchTerm,updateSearchTerm,addToCart,getCartCount,updateQuantity,getCartAmount,currency,token,setToken
    }

   


    return (
        <ShopContext.Provider value={value} >
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;