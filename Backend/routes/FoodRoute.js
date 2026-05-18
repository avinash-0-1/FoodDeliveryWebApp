import express from "express";
import { addFood, listFood, removeFood } from "../controllers/FoodController.js";
import multer from "multer";
import food_model from "../models/food_model.js";

const Food_router = express.Router();

//image storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

Food_router.post("/add",upload.single("image"),addFood)
Food_router.get("/list",listFood)
Food_router.post("/remove",removeFood)

export default Food_router;