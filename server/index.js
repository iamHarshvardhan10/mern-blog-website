import express from 'express'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()


// Importing All Routes 
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
// connecting express with const app
const app = express()

app.use(express.json())
app.use(cookieParser())

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB Connected')
}).catch((error) => {
    console.log(error)
})



// listening server on port 
app.listen(1000, () => {
    console.log('Server is running on port 1000')
})


app.use('/api/user', userRoutes)

// User APIs
app.use('/api/auth', authRoutes)


// Post Apis
app.use('/api/post', postRoutes)

// comment api
app.use('/api/comment', commentRoutes)

// creating Middleware 

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
    next()
})