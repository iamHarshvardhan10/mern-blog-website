import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/errorHandler.js";


export const signUp = async (req, res, next) => {
    try {
        //  Destructring user model
        const { userName, email, password } = req.body;

        // checking user Already exist or not
        if (!userName || !email || !password || userName == "" || email == "" || password == "") {
            // return res.status(400).json({ message: 'All fields Required' })
            next(errorHandler(404, 'All Fields Are required'))
        }

        const hashPassword = bcryptjs.hashSync(password, 10)
        // storing all info in user model
        const newUser = new User({ userName, email, password: hashPassword })

        const user = await newUser.save()
        res.json({ message: 'user Created Successfully', data: user })


    } catch (error) {
        next(error)

    }

}