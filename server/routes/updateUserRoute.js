const express               = require('express');
const router                = express.Router();
const updateUser            = require('../services/updateUser')

router.route('/')
    .get(updateUser);

module.exports = router;