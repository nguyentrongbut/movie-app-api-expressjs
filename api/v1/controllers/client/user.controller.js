const User = require('../../models/user.model')
const bcrypt = require("bcrypt");
const paginationHelper = require('../../../../helpers/pagination')
const searchHelper = require('../../../../helpers/search.helper');
const sortHelper = require('../../../../helpers/sort.helper');

// [GET] /api/v1/user
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        // Search
        ...searchHelper(req.query, ['user_name', 'email'])
        // End Search
    }


    // Sort
    let sort = sortHelper(req.query)
    // End Sort

    // Pagination
    const countUser = await User.countDocuments(find)

    let objectPagination = paginationHelper({
            currentPage: 1,
            limitItems: Number(req.query.limit) || 10,
        },
        req.query,
        countUser)
    // End Pagination

    try {
        const users = await User.find(find).select('-password -deleted')
            .sort(sort)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);
        res.status(200).json({
            message: 'Get list user success!',
            user: users,
            pagination: {
                total: countUser,
                limit: objectPagination.limitItems,
                currentPage: objectPagination.currentPage,
                totalPages: objectPagination.totalPages
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [POST] api/v1/user/account/create
module.exports.create = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    try {
        if (req.avatarUrl && !req.body.avatar_url) {
            req.body.avatar_url = req.avatarUrl;
        }
        const account = new User(req.body)
        await account.save()
        res.status(200).json({
            message: 'Create user success!',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [DELETE] api/v1/user/account/delete
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await User.updateOne({_id: id}, {
            deleted: true
        })
        res.status(200).send({
            message: 'Delete user success!',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}

// [PATCH] api/v1/user/account/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    try {
        await User.updateOne({_id: id}, {
            status: status
        })
        res.status(200).json({
            message: 'Update status success!',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [PATCH] api/v1/user/account/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids;

    switch (type) {
        case 'active':
            try {
                await User.updateMany({_id: ids}, {
                    status: "active"
                })
                res.status(200).json({
                    message: 'Update status success!',
                })
            } catch (error) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
            break
        case 'inactive':
            try {
                await User.updateMany({_id: ids}, {
                    status: "inactive"
                })
                res.status(200).json({
                    message: 'Update status success!',
                })
            } catch (error) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
            break
        case 'delete-all':
            try {
                await User.updateMany({_id: ids}, {
                    deleted: "true"
                })
                res.status(200).json({
                    message: 'Delete success!',
                })
            } catch (error) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
            break
        default:
            break
    }
}

// [GET] api/v1/user/account/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    let find = {
        _id: id,
        deleted: false
    }

    try {
        const user = await User.findOne(find).select("-password -deleted")

        res.status(200).json({
            message: 'Get account success!',
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [PATCH] api/v1/user/account/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    try {
        if (req.body.password) {
            const salt = 10;
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } else {
            delete req.body.password;
        }

        await User.updateOne({_id: id}, req.body)
        res.status(200).json({
            message: 'Update account success!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}