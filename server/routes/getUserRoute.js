const express               = require('express');
const router                = express.Router();
const user                  = require('../controllers/getUser');
const auth                  = require('../middleware/auth');

router.route('/')
    .get(auth, user)

module.exports=router;