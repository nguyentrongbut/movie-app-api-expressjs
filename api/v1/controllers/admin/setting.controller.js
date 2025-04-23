const Setting = require('../../models/setting.model');

// [GET] api/v1/admin/setting
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }
    try {
        const settings = await Setting.findOne(find).select("-deleted")
        res.status(200).json({
            message: "Get info settings success!",
            settings: settings
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [PATCH] api/v1/admin/setting/edit
module.exports.edit = async (req, res) => {
    try {
        const result = await Setting.updateOne({}, req.body, { upsert: true });
        res.status(200).json({
            message: "Update info settings success!"
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


