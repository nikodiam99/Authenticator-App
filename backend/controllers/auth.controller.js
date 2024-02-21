import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
//request is data we are getting from client side
//response is data we send to client side
export const signup = async (req, res, next) => {
    //console.log(req.body);
    const{username, email, password} = req.body;
    //hashSync instead of hash that is asyncronous
    const hashedPassword = bcryptjs.hashSync(password, 10); 
    //created from user model
    const newUser = new User({username, email, password: hashedPassword});
    try{
        //we need to use await because it is asynchronous behaviour
        await newUser.save();
        res.status(201).json({ message: "User created successfully."});
    } catch (error){
       // res.status(500).json(error.message);
        next(error); //getting error from middleware in index.js
    }
    
};