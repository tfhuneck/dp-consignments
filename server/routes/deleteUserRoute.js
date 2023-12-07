const express               = require('express');
const router                = express.Router();
const user                  = require('../controllers/deleteUser')

router.route('/')
    .post(user);

module.exports = router;