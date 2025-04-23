const authRouter = require('./auth.route')
const userRouter = require('./user.route')
const jwtMiddleware = require('../../middlewares/jwt')
const systemConfig = require("../../../../config/system");

module.exports = (app) => {
    const PATH_CLIENT = systemConfig.prefixUser;
    const version = "/api/v1";
    app.use(version + "/", authRouter)

    app.use(version + PATH_CLIENT + '/account',
        jwtMiddleware.verifyToken,
        userRouter
    )
}