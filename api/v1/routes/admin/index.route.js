const adminRouter = require('./admin.route')

module.exports = (app) => {
    const version = "/api/v1"

    app.use(version + "/admin", adminRouter)
}