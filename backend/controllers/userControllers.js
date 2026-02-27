import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"



// user login

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ succes: false, message: "user doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "invalid credential" })

        }


        const token = createToken(user._id);
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error })


    }

}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// user register

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            res.json({ success: false, message: "user already exists" })

        }

        // validating email & strong password
        if (!validator.isEmail(email)) {
            res.json({ success: false, message: "please enter a valid email" })

        }

        if (password.length < 8) {
            res.json({ success: false, message: "please enter a strong password" })

        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)


        // sending welcome email
        // const mailOption = {
        //     from: process.env.EMAIL,
        //     to: email,
        //     subject: 'Welcome to Justring',
        //     text: `Welcome to Justring website. Your account has been created with email id: ${email}`,


        // }

        // await transporter.sendMail(mailOption);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }

}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "invalid credantials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        console.log(user);
        

        if (!user) {
            return res.json({ success: false, message: "user not found" })

        }

        res.json({
            success: true,
            userData: {
                name: user.name,
               
            }

        });

    } catch (error) {
        console.log(error.message);


    }
}

export { loginUser, registerUser, adminLogin, getUserData }