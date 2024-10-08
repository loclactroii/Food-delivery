import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { getAllOrders, getMyOrders, placeOrder, updateStatus, verifyOrder } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/myorders', authMiddleware, getMyOrders)
orderRouter.get('/get', getAllOrders)
orderRouter.post('/update', updateStatus)

export default orderRouter