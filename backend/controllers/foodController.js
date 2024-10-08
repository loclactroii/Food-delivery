import foodModel from '../models/foodModel.js'
import fs from 'fs'

// add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`
    const food = new foodModel({
        image: image_filename,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price
    })

    // save data into database
    try {
        await food.save()
        res.json({success: true, message: 'Food Added'})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error'})
    }
}

// get food list
const getList = async (req, res) => {
    try {
        const data = await foodModel.find({})
        res.json({success: true, data: data})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error'})
    }
}

// remove food from list
const removeFood = async (req, res) => {
    try {
        await foodModel.findByIdAndDelete({_id:req.body.id})
        res.json({success: true, message: 'Removed'})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error'})
    }
}

export {addFood, getList, removeFood}