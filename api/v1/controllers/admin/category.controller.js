const Category = require('../../models/category.model');
const createTreeHelper = require('../../../../helpers/create.tree.helper');
const sortHelper = require("../../../../helpers/sort.helper");
const paginationHelper = require("../../../../helpers/pagination");
const {convertSlug} = require("../../../../helpers/convert.slug.helper");

// [GET] api/v1/admin/category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }
    // Sort
    let sort = sortHelper(req.query)
    // End Sort

    // Pagination
    const countCategory  = await Category.countDocuments(find)

    let objectPagination = paginationHelper({
            currentPage: 1,
            limitItems: Number(req.query.limit) || 10,
        },
        req.query,
        countCategory)
    try {
        const category = await Category.find(find)
            .select("-deleted")
            .sort(sort)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);

        const newCategory = createTreeHelper.tree(category)
        res.status(200).json({
            message: "Get info categories success!",
            category: newCategory,
            pagination: {
                total: countCategory,
                limit: objectPagination.limitItems,
                currentPage: objectPagination.currentPage,
                totalPages: objectPagination.totalPages
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [POST] api/v1/admin/category/create
module.exports.create = async (req, res) => {
    let { slug, title, ...rest } = req.body;

    slug = convertSlug(slug, title)
    try {
        const category = new Category({
            slug,
            title,
            ...rest
        })
        await category.save()
        res.status(200).json({
            message: "Create categories success!",
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [DELETE] api/v1/admin/category/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Category.updateOne({_id: id}, {
            deleted: true
        })
        console.log("success!")
        res.status(200).send({
            message: 'Delete category success!',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}

// [PATCH] api/v1/category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    try {
        await Category.updateOne({_id: id}, {
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

// [PATCH] api/v1/category/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids;

    switch (type) {
        case 'active':
            try {
                await Category.updateMany({_id: ids}, {
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
                await Category.updateMany({_id: ids}, {
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
                await Category.updateMany({_id: ids}, {
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

// [GET] api/v1/category/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    let find = {
        _id: id,
        deleted: false
    }

    try {
        const category = await Category.findOne(find).select("-password -deleted")

        res.status(200).json({
            message: 'Get account success!',
            category: category
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [PATCH] api/v1/category/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    try {
        await Category.updateOne({_id: id}, req.body)
        res.status(200).json({
            message: 'Update account success!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}