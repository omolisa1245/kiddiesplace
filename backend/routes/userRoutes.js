import express from 'express'
import authUser from "../middleware/auth.js"
import { loginUser, registerUser, adminLogin, getUserData } from '../controllers/userControllers.js' 



const userRouter = express.Router();


userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/admin",adminLogin)
userRouter.get("/data",authUser, getUserData )


export default userRouter;