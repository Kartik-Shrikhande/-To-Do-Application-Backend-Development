const express = require('express')
const app = express()

const userRoutes = require('./src/routes/userRoutes')
const todoRoutes = require('./src/routes/todoRoutes')

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

app.use(express.json())
app.use('/user', userRoutes)
app.use('/todo', todoRoutes)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log('MongoDB is connected') })
    .catch((error) => { console.log(error); })

app.listen(process.env.PORT, () => {
    console.log('App is running on port', + process.env.PORT)
})