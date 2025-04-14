const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/role.controller');
const validate = require('../../validates/admin/role.validate')

router.get('/', controller.index);

router.post('/create',
    validate.hasTitle,
    controller.create);

router.patch('/edit/:id',
    validate.hasId,
    validate.hasTitle,
    controller.edit
    )

router.delete('/delete/:id',
    validate.hasId,
    controller.delete
    )

module.exports = router;