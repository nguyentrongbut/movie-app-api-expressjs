const Admin = require('../../models/admin.model')
const bcrypt = require("bcrypt");
const Role = require("../../models/role.model");

// [GET] api/v1/admin/account
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    let sort = {createdAt: -1}
    try {
        const users = await Admin.find(find)
            .select("-password -deleted")
            .sort(sort)

        const roles = await Role.find();

        const roleMap = roles.reduce((acc, role) => {
            acc[role._id.toString()] = role.title;
            return acc;
        }, {});

        const updatedUsers = users.map(user => {
            const userObj = user.toObject(); // Chuyển document Mongoose thành object thường
            if (userObj.role_id) {
                userObj.role = roleMap[userObj.role_id.toString()] || null;
            } else {
                userObj.role = null;
            }
            return userObj;
        });

        res.status(200).json({
            message: 'Get list account success!',
            users: updatedUsers
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [POST] api/v1/admin/account/create
module.exports.create = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    try {
        if (req.avatarUrl && !req.body.avatar_url) {
            req.body.avatar_url = req.avatarUrl;
        }
        const account = new Admin(req.body)
        await account.save()
        res.status(200).json({
            message: 'Create account success!',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [DELETE] api/v1/admin/account/delete
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Admin.updateOne({_id: id}, {
            deleted: true
        })
        res.status(200).send({
            message: 'Delete account success!',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}

// [PATCH] api/v1/admin/account/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    try {
        await Admin.updateOne({_id: id}, {
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

// [PATCH] api/v1/admin/account/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids;

    switch (type) {
        case 'active':
            try {
                await Admin.updateMany({_id: ids}, {
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
                await Admin.updateMany({_id: ids}, {
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
                await Admin.updateMany({_id: ids}, {
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

// [GET] api/v1/admin/account/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    let find = {
        _id: id,
        deleted: false
    }

    try {
        const user = await Admin.findOne(find).select("-password -deleted")
        const role = await Role.findOne({_id: user?.role_id});

        // add title role -> user
        const updateUser = {
            ...user.toObject(),
            role: role?.title || ""
        }
        res.status(200).json({
            message: 'Get account success!',
            user: updateUser
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [PATCH] api/v1/admin/account/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    try {
        if (req.body.password) {
            const salt = 10;
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } else {
            delete req.body.password;
        }

        await Admin.updateOne({_id: id}, req.body)
        res.status(200).json({
            message: 'Update account success!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}