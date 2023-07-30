const express               = require('express');
const router                = express.Router();
const activelistingsapi     = require('../controllers/activelistingsapi');

router.route('/') 
    .post(activelistingsapi.enterListings);

module.exports=router;