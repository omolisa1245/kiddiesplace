import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js"


const app = express()
const port = process.env.PORT || 4000

connectDB();
connectCloudinary()


// middleware 
app.use(express.json())
app.use(cors())


//api end port

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req,res) =>{
    res.send('api working')
})

app.listen(port, ()=> console.log('server started on port:' + port));
