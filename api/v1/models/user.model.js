const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    phone: String,
    avatar_url: String,
    status: String,
    last_login: Date,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {timestamps: true});

const User = mongoose.model('User', userSchema, "users");

module.exports = User;