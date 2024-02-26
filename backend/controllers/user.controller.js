import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.models.js";


//best practice to keep functions in controller folder to keep index and user route clean
export const test = (req, res) => {
    res.json({
        message: 'API is working',
    });
};

//update user

export const updateUser = async (req, res ,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'You can update only your account!'));
    }

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        //from user model, use findbyidandupdate mongodb method
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    emai: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            {new: true} //if we dont add this when you send req back to user you will get the previous user thats not updated
        );
        //remove password from the rest
        const {password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
};