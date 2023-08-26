const express               = require('express');
const router                = express.Router();
const updateListings     = require('../controllers/updateListings');
const converter             = require('../middleware/converListingData');
const getListings           = require('../controllers/getListings')

router.route('/')
    .get(getListings)
    .post(converter, updateListings)

module.exports=router;