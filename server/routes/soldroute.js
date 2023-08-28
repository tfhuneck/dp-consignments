const express               = require('express');
const router                = express.Router();
const converter             = require('../middleware/convertSoldData');
const postSold              = require('../controllers/postSold');
const getSold               = require('../controllers/getSold');

router.route('/')
    .get(getSold)
    .post(converter, postSold)

module.exports=router;