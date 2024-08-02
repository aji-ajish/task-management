import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from "cors";
import connectDB from './config/db.js';
import userRouter from './routes/user.js';

const app = express()
dotenv.config({ path: './config/.env' })
const port = process.env.PORT;

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

// static files
app.use('/userProfiles',express.static('userProfiles'))

// routes
app.use('/api/', userRouter)


app.listen(port, () => {
    console.log('Server listening on port', port);
    connectDB()
})