module.exports.index = (req, res) => {
    res.json({
        message: 'User index',
        user: req.user
    })
}