import userModel from "../models/userModels.js";


const addToCart = async (req, res) => {
    try {
        const { itemId, userId, sizes } = req.body;

        const userData = await userModel.findById(userId); // Added await

        if (!userData) {
            return res.json({ success: false, message: "user not found" });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if it's null/undefined
        console.log(cartData);

        if (cartData[itemId]) {
            if (cartData[itemId][sizes]) {
                cartData[itemId][sizes] += 1;
            } else {
                cartData[itemId][sizes] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][sizes] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "product added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
    
        const { userId, itemId, sizes, quantity } = req.body; 

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; 

        if (!cartData[itemId]) {
            cartData[itemId] = {}; 
        }
        

        const validQuantity = Number(quantity);
        if (isNaN(validQuantity) || validQuantity < 0) {
            return res.status(400).json({ success: false, message: "Invalid quantity" });
        }

        cartData[itemId][sizes] = validQuantity;
        await userModel.findByIdAndUpdate(userId, { $set: { cartData: cartData } });
       


        res.json({ success: true, message: "Cart updated successfully" });

    } catch (error) {
        console.error("Error updating cart:", error); 
        res.status(500).json({ success: false, message: "An internal server error occurred" });
    }
};




const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);

        if (!userData) {
           
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {}; 

        res.json({ success: true, cartData: cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { addToCart, getUserCart, updateCart }