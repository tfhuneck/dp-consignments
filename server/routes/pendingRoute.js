const express               = require('express');
const router                = express.Router();
const converter             = require('../middleware/convertPendingData');
const postPending              = require('../controllers/postPending');
const getPending               = require('../controllers/getPending');

router.route('/')
    .get(getPending)
    .post(converter, postPending)

module.exports=router;