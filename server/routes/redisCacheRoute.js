const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const Redis                 = require('../services/redisCache')

router.route('/')
    .get(auth, Redis);

module.exports = router;