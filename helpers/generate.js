const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
    })
}

module.exports.generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    })
}