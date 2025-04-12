const User = require('../../models/user.model')

// [GET] /api/v1/users
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    }

    try {
        const users = await User.find(find).select('-password -deleted');
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}