const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/movie.controller');
const upload = require("../../middlewares/upload");
const uploadToIA = require("../../middlewares/updloadToIA");


router.get('/', controller.index);

router.post('/create',
    upload.single('video_url'),
    uploadToIA,
    controller.create);

module.exports = router;