const authRouter = require('./auth.route')
const userRouter = require('./user.route')
const jwtMiddleware = require('../../middlewares/jwt')

module.exports = (app) => {
    const version = "/api/v1"

    app.use(version + "/", authRouter)

    app.use(version + "/users",
        jwtMiddleware.verifyToken,
        userRouter
    )
}