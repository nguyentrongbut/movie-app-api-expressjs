const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/setting.controller');
const upload = require("../../middlewares/upload");
const uploadMultiple = require("../../middlewares/uploadMultipleFiles");

router.get('/', controller.index);
router.patch('/edit',
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'favicon', maxCount: 1 }
    ]),
    uploadMultiple.uploadMultipleFilesToImgur({
        logo: 'logo',
        favicon: 'favicon'
    }),
    controller.edit);

module.exports = router;