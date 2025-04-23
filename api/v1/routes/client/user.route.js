const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/user.controller');
const upload = require("../../middlewares/upload");
const uploadCloud = require("../../middlewares/uploadToImgur");
const validateStatus = require("../../validates/admin/change.status.validate");
const validate = require("../../validates/admin/role.validate");

router.get('/',
    controller.index);
router.post('/create',
    upload.single('avatar_url'),
    uploadCloud.uploadToImgur,
    controller.create);

router.delete('/delete/:id', controller.delete);
router.patch('/change-status/:status/:id',
    validateStatus.hasStatus,
    controller.changeStatus);
router.patch('/change-multi',
    validate.hasIds,
    validateStatus.hasStatusMulti,
    controller.changeMulti);
router.get('/:id', controller.detail);
router.patch('/edit/:id',
    upload.single('avatar_url'),
    uploadCloud.uploadToImgur,
    controller.edit);


module.exports = router;