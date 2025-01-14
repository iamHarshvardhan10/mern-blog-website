import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { errorHandler } from "../utils/errorHandler.js";

dotenv.config()


// functionality for signUp (creating User)
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

// Functionality for signin user 

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email == "" || password == "") {
        return next(errorHandler(404, 'All Fields are Required'))
    }
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User Not Found!! Check the Credentials'))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(404, 'Invalid Password'))
        }

        const token = jwt.sign({ id: validUser._id , isAdmin : validUser.isAdmin}, 'mern-blog-website')
        const { password: pass, ...rest } = validUser._doc
        res.status(200).cookie('access_token', token, { httpOnly: true }).json({ message: 'SingIn SuccessFully', access_token: token, ...rest })
    } catch (error) {
        next(error)
    }

}



export const google = async (req, res, next) => {
    const { name, email, photoUrl } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            // eslint-disable-next-line no-undef
            const token = jwt.sign({ id: user._id , isAdmin : user.isAdmin}, 'mern-blog-website')
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({
                userName: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email: email,
                password: hashPassword,
                imageUrl: photoUrl
            })
            await newUser.save()
            // eslint-disable-next-line no-undef
            const token = jwt.sign({ id: user._id, isAdmin : user.isAdmin }, 'mern-blog-website')
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest)

        }
    } catch (error) {
        next(error)
    }

}