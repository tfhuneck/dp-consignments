const express   = require('express');
const router    = express.Router();
const mail      = require('../controllers/sendEmail');

router.route('/')
    .post(mail)

module.exports = router;