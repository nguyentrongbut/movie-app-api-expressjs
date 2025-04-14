const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/user.controller');
const jwtMiddleware = require('../../middlewares/jwt');

router.get('/',
    jwtMiddleware.verifyToken,
    controller.index);



module.exports = router;