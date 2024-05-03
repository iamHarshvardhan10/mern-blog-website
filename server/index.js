import express from 'express'
import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config()


// Importing All Routes 
import testRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
// connecting express with const app
const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB Connected')
}).catch((error) => {
    console.log(error)
})



// listening server on port 
app.listen(1000, () => {
    console.log('Server is running on port 1000')
})


app.use('/api/v1/user' , testRoutes)

// User APIs
app.use('/api/v1/auth',authRoutes)