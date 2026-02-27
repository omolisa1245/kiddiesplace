import express from "express"
import { allOrders, userOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, verifyStripe } from "../controllers/orderController.js" 
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter = express.Router();

orderRouter.post('/list', allOrders )
orderRouter.post("/status",adminAuth, updateStatus)


// payment features

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post("/stripe", authUser, placeOrderStripe)
orderRouter.post("/razorpay", authUser, placeOrderRazorpay)


// user feature

orderRouter.post('/userorder', authUser, userOrders)

// verify stripe

orderRouter.post('/verify', authUser, verifyStripe)



export default orderRouter;