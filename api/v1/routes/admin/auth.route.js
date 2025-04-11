const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/auth.controller');

router.post('/login', controller.login);

router.post('/refresh', controller.refreshToken);

router.post('/logout', controller.logout);

module.exports = router; 