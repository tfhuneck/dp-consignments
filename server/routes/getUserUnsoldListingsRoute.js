const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const listings              = require('../controllers/getUserUnsoldListings');


router.route('/')
    .get(auth, listings)

module.exports=router;