const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
    })
}

module.exports.generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.REFRESH_TOKEN_SECRET, {
    })
}