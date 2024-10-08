import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("API Working")
})

// api endpoints
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/images', express.static('uploads'))

// connect DB
connectDB()

app.listen(port, () => {
    console.log(`Sever Started on http://localhost:${port}`);
})