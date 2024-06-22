import express  from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "./routes/user.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)

mongoose.connect('mongodb://127.0.0.1:27017/authentication') 


app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})