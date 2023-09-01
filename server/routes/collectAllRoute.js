const express               = require('express');
const router                = express.Router();
const collectAll            = require('../services/collectAllData')

router.route('/')
    .get(collectAll);

module.exports = router;