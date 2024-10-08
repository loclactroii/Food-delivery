import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { addCartItem, getCart, removeCartItem } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/add', authMiddleware, addCartItem)
cartRouter.post('/remove', authMiddleware, removeCartItem)
cartRouter.get('/get', authMiddleware, getCart)

export default cartRouter