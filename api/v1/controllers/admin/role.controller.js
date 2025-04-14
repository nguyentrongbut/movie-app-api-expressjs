const Role = require('../../models/role.model')

// [GET] api/v1/admin/role
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }
    try {
        const listRole = await Role.find(find)
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