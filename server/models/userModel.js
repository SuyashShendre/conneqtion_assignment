const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "first name is required"]
    },
    lastname: {
        type: String,
        required: [true, "last name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema); 