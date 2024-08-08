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
app.use(cookieParser())

const whitelist = ['http://localhost:8080'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies to be sent with the request
};

app.use(cors(corsOptions))

// static files
app.use('/userProfiles', express.static('userProfiles'))

// routes
app.use('/api/v1/', userRouter)


app.listen(port, () => {
    console.log('Server listening on port', port);
    connectDB()
})