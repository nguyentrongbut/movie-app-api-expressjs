const Role = require('../../models/role.model')

// [GET] api/v1/admin/role
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }
    try {
        const listRole = await Role.find(find).select("-deleted")
        res.status(200).send({
            message: 'Get list role success',
            roles: listRole
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}

// [POST] api/v1/role/create
module.exports.create = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    try {
        const role = new Role({title, description})
        await role.save();
        res.status(201).send({
            message: 'Create new role success!',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}

// [PATCH] api/v1/admin/role/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    try {
        await Role.updateOne({_id: id}, {
            title: title,
            description: description,
        })
        res.status(200).send({
            message: 'Update role success!',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}

// [DELETE] api/v1/admin/role/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Role.updateOne({_id: id}, {
            deleted: true
        })
        res.status(200).send({
            message: 'Delete role success!',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }

}

// [GET] api/v1/admin/role/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;

    const find = {
        deleted: false,
        _id: id
    }

    try {
        const role = await Role.findOne(find).select("-deleted")
        if (!role) {
            return res.status(404).send({
                message: 'Role not found'
            });
        }
        res.status(200).send({
            message: 'Get role success!',
            role: role
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}

// [PATCH] api/v1/admin/role/change-multi
module.exports.changeMulti = async (req, res) => {
    const ids = req.body.ids;

    try {
        await Role.updateMany({_id: { $in: ids }}, {
            deleted: true
        })
        res.status(200).send({
            message: 'Update roles success!',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}