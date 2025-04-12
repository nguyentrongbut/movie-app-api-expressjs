const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/auth.controller');
const jwtMiddleware = require('../../middlewares/client/jwt');

router.post('/login', controller.login);

router.post('/refresh', controller.refreshToken);

router.post('/logout', controller.logout);

router.get('/profile',
    jwtMiddleware.verifyToken,
    controller.profile)

module.exports = router; 