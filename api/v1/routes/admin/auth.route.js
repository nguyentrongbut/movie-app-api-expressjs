const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/auth.controller');
const jwtMiddleware = require('../../middlewares/client/jwt');
const upload = require('../../middlewares/upload');
const uploadCloud = require('../../middlewares/uploadToImgur');

router.post('/login', controller.login);

router.post('/refresh', controller.refreshToken);

router.post('/logout', controller.logout);

router.get('/profile',
    jwtMiddleware.verifyToken,
    controller.profile)

router.patch('/profile/edit',
    jwtMiddleware.verifyToken,
    upload.single('avatar_url'),
    uploadCloud.uploadToImgur,
    controller.edit)

module.exports = router; 