import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
//place mongo connection in env file to hide password and connection to DB
//and check if connection is successfull 
mongoose.connect(process.env.MONGO).then (()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});
const app = express();
//so we can send json as input of backend
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500; //500 is internal server error
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,

    });
});