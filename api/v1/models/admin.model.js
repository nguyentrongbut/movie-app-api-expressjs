const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    phone: String,
    avatar_url: String,
    status: String,
    refresh_token: String,
    last_login: Date,
    role_id: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {timestamps: true});

const Admin = mongoose.model('Admin', adminSchema, "admins");

module.exports = Admin;