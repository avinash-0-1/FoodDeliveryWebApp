import mongoose from "mongoose";


const food_Schema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image:{type:String,required:true},
    category: {type:String,required:true}
})

const food_model = mongoose.models.food || mongoose.model("food",food_Schema)

export default food_model;