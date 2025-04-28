const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/category.controller');


router.get('/', controller.index);
router.post('/create', controller.create);

router.delete('/delete/:id', controller.delete);
router.patch('/change-status/:status/:id',
    controller.changeStatus);
router.patch('/change-multi',
    controller.changeMulti);
router.get('/:id', controller.detail);
router.patch('/edit/:id',
    controller.edit);

module.exports = router;