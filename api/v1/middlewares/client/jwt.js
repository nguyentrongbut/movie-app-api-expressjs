const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
        const accessToken = token.split(" ")[1]
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: 'Token is not valid'
                })
            }
            req.user = user
            next()
        })
    } else {
        res.status(401).json({
            message: 'You are not authenticated'
        })
    }
}


// module.exports.verifyTokenAndAdminAuth = (req, res, next) => {
//    this.verifyToken(req, res, () => {
//        if (req.user.id === req.params.id || req.user.isAdmin) {
//            next()
//        } else {
//            res.status(403).json({
//                message: 'You are not allowed to do that'
//            })
//        }
//    })
// }