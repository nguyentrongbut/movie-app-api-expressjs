const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: String,
    userId: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: process.env.REFRESH_TOKEN_EXPIRES_IN,
    }
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);