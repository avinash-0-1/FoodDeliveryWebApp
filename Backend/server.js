import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import Food_router from "./routes/FoodRoute.js";
import userRouter from "./routes/userRoute.js";
// import 'dotenv/config';
import dotenv from 'dotenv';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// -----app config -------------------
dotenv.config();
const app= express()
const port = process.env.PORT || 4000;

//----------middleware ---------------
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("API Working")
})
//--------DB Connection
connectDB();

//=========== api endpoints 
app.use("/api/food",Food_router)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{
    console.log(`server is start on http://localhost:${port}`)
})

//mongodb+srv://avinashraj0918:<comm pass full>cluster0.so063ks.mongodb.net/?

// ======================== problem error while setting up express backend server =========================