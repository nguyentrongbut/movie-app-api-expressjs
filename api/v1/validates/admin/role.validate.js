module.exports.hasTitle = (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: 'Title is required',
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