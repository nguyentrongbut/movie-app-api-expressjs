module.exports.hasTitle = (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: 'Tên vai trò không được để trống',
        })
    }
    next();
}

module.exports.hasId = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({
            message: 'Id is required',
        })
    }
    next();
}

module.exports.hasIds = async (req, res, next) => {
    if (!req.body.ids) {
        return res.status(400).send({
            message: 'Ids is checked',
        })
    }
    next();
}