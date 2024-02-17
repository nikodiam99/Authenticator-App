import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
dotenv.config();
//place mongo connection in env file to hide password and connection to DB
//and check if connection is successfull 
mongoose.connect(process.env.MONGO).then (()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});
const app = express();

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});