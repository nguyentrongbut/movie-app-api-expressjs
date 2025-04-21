module.exports.hasStatus = (req, res, next) => {
    if (!req.params.status) {
        return res.status(400).send({
            message: 'Chưa có trạng thái!',
        })
    }
    next();
}

module.exports.hasStatusMulti = (req, res, next) => {
    if (!req.body.type) {
        return res.status(400).send({
            message: 'Chưa có trạng thái!'
        })
    }
    next()
}