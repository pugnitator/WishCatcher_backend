import mongoose from "mongoose";

const User = new mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    birthday: {type: Date},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('User', User);