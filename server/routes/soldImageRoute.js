const express               = require('express');
const router                = express.Router();
const getImage              = require('../controllers/getSoldImage')

router.route('/')
    .post(getImage)

module.exports = router;