import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true, //must have username in a user
        unique: true,
    },
    email:{
        type: String,
        required: true, //must have username in a user
        unique: true,
    },
    password:{
        type: String,
        required: true, //must have username in a user
    }
}, {timestamps: true}); //timestamps means each user will have time of creation and time of edit

const User = mongoose.model('User', userSchema);
//export in case I use it in other files in the application
export default User;