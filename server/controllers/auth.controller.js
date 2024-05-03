import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'


export const signUp = async (req, res) => {
    try {
        //  Destructring user model
        const { userName, email, password } = req.body;

        // checking user Already exist or not
        if (!userName || !email || !password || userName == "" || email == "" || password == "") {
            return res.status(400).json({ message: 'All fields Required' })
        }

        const hashPassword = bcryptjs.hashSync(password, 10)
        // storing all info in user model
        const newUser = new User({ userName, email, password: hashPassword })

        const user = await newUser.save()
        res.json({ message: 'user Created Successfully', data: user })

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}