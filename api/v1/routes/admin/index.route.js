const systemConfig = require('../../../../config/system')
const authRouter = require('./auth.route')
const roleRoute = require('./role.route')
const jwtMiddleware = require('../../middlewares/jwt');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    const version = "/api/v1";

    app.use(version + PATH_ADMIN, authRouter)
    app.use(version + PATH_ADMIN + "/role",
        jwtMiddleware.verifyToken,
        roleRoute)
}