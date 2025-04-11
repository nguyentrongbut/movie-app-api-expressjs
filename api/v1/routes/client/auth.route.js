const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/auth.controller');
const jwtMiddleware = require('../../middlewares/client/jwt');

router.post('/login', controller.login);

router.post('/register', controller.register);

router.post('/refresh', controller.refreshToken);

router.post('/logout',
    jwtMiddleware.verifyToken,
    controller.logout);

module.exports = router;