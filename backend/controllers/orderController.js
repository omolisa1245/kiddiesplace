import orderModel from "../models/orderModels.js"
import userModel from "../models/userModels.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// global variable

const currency = "usd"
const deliveryCharge = 10



const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })


    }
}



const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })


    }
}

// place orde using cash on delivery
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()

        };

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {
            cartData: {}
        })


        res.json({ success: true, message: "order placed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// place orde using stripe
const placeOrderStripe = async (req, res) => {

    const frontend_url = "http://localhost:5174"

    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,

            },

            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "delivery charge"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: "payment"
        });
    

        res.json({ success: true, session_url: session.url })



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// place orde using razorpay
const placeOrderRazorpay = async (req, res) => {

}


const verifyStripe = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "paid" })
            
        }
         else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "not paid" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// updatestatus to admin
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: "order updated" })
    } catch (error) {

    }
}


export { allOrders,verifyStripe, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders }