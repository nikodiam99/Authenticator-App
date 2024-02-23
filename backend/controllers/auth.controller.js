import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
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
//next is to use middleware for handling the error
export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        //User mongoose model, findone is mongoose method to search
        const validUser = await User.findOne({ email });
        //error handler object inside error.js
        if (!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials'));
        //JWt secret key to verify our token
        const token = jwt.sign ({id: validUser._id}, process.env.JWT_SECRET);
        //remove sending back passowrd
        const{ password: hashedPassword, ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now()+3600000)//1 hour
        //put token inside cookie of user, httpOnly:true is to prevent 3rd party app to modify token
        res.cookie('access_token', token, {httpOnly:true, expires: expiryDate}) //age is to keep 
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const { password:hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now()+3600000)//1 hour
            res.cookie('access_token', token, {httpOnly:true, expires: expiryDate}).status(200).json(rest);
        } else {
            //password from 0-9, alphabet a-z and 8 long + 8 = 16 digits long
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); 
            const hashedPassword = bcryptjs.hashSync(generatedPassword);

            const newUser = new User({username: req.body.name.split(' ').join('').toLowerCase() +
            ((Math.floor(Math.random() * 10000)).toString()), email: req.body.email, password: hashedPassword, profilePicture: req.body.photo});

            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password: hashedPassword2, ...rest} = newUser._doc;
            const expiryDate = new Date(Date.now()+3600000)
            res.cookie('access_token', token, {httpOnly:true, expires: expiryDate}).status(200).json(rest);
        }
    } catch (error) {
        next(error)
    }
}
