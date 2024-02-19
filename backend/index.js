import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

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

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);