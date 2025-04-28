const systemConfig = require('../../../../config/system')
const authRouter = require('./auth.route')
const roleRoute = require('./role.route')
const accountRoute = require('./account.route')
const settingRoute = require('./setting.route')
const categoryRoute = require('./category.route')
const jwtMiddleware = require('../../middlewares/jwt');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    const version = "/api/v1";

    app.use(version + PATH_ADMIN, authRouter)
    app.use(version + PATH_ADMIN + "/role",
        jwtMiddleware.verifyToken,
        roleRoute)
    app.use(version + PATH_ADMIN + "/account",
        jwtMiddleware.verifyToken,
        accountRoute)
    app.use(version + PATH_ADMIN + "/setting",
        jwtMiddleware.verifyToken,
        settingRoute)
    app.use(version + PATH_ADMIN + "/category",
        jwtMiddleware.verifyToken,
        categoryRoute)
}