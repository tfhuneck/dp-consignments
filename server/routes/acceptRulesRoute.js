const express   = require('express');
const router    = express.Router();
const rules     = require('../controllers/acceptRules');

router.route('/')
    .post(rules);

module.exports = router;