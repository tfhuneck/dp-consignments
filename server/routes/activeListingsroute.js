const express               = require('express');
const router                = express.Router();
const converter             = require('../middleware/convertListingData');
const updateListings        = require('../controllers/updateListings');
const getListings           = require('../controllers/getListings');

router.route('/')
    .get(getListings)
    .post(converter, updateListings)

module.exports = router;