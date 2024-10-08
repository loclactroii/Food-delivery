import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://maaseenkout:omegacentauri@database.tig93th.mongodb.net/Food_Delivery_1`)
        .then(()=>console.log('Database connected'))
}

//mongodb+srv://maaseenkout:omegacentauri@database.tig93th.mongodb.net/?