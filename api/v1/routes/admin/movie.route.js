const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/movie.controller');
const upload = require("../../middlewares/upload");
const uploadToIA = require("../../middlewares/updloadToIA");
const uploadMultiple = require("../../middlewares/uploadMultipleFiles");


router.get('/', controller.index);

router.post('/create',
    upload.fields([
        { name: 'thumbnail_url', maxCount: 1 },
        { name: 'poster_url', maxCount: 1 },
        { name: 'video_url', maxCount: 1}
    ]),
    // uploadToIA,
    uploadMultiple.uploadMultipleFilesToImgur({
        thumbnail_url: 'thumbnail_url',
        poster_url: 'poster_url'
    }),
    controller.create);

module.exports = router;