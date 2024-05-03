import express from 'express'
import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config()
// connecting express with const app
const app = express()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB Connected')
}).catch((error) => {
    console.log(error)
})



// listening server on port 
app.listen(1000, () => {
    console.log('Server is running on port 1000')
})


// basic get route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our API",
        Success: 'Its server 1000'
    })
})