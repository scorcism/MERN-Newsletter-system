const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
            select: false,
        },
        isVerified: {
            type: Number,
            default: 0,
            select: false,
        },
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
