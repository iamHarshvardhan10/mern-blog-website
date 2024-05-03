import express from 'express'

const app = express()

app.listen(1000, () => {
    console.log('Server is running on port 1000')
})

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our API",
        Success: 'Its server 1000'
    })
})