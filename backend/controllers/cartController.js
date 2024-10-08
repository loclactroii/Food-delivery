import userModel from "../models/userModel.js";


// add cart item
const addCartItem = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        const cartData = await user.cartData
        if (cartData[req.body.itemId]) {
            cartData[req.body.itemId] += 1
        }
        else {
            cartData[req.body.itemId] = 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: 'Add' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}


// remove cart item
const removeCartItem = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        const cartData = await user.cartData
        cartData[req.body.itemId] -= 1

        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: 'Removed' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}


// get cart item
const getCart = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        const cartData = await user.cartData
        res.json({ success: true, data: cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}

export { addCartItem, removeCartItem, getCart }