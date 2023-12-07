const express   = require('express');
const router    = express.Router();
const upload    = require('../controllers/uploadAvatar')
const saveUrl   = require('../controllers/saveAvatarUrl')

router.route('/')
    .post(saveUrl)
    .get(upload)

module.exports = router;