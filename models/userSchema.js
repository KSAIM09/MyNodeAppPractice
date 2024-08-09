const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // name: String,
    // email: String,
    // password: String,
    // Old Schema

    // New Schema with validations 9-8-24
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [20, "Name should not be more than 20 characters"],
        minLength: [3, "Name should not be less than 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ],
        lowercase: true
    },
    password: { 
        type:String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
        maxLength: [12, "Password must not be more than 12 characters long"],
        select: false,
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;