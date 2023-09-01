const express               = require('express');
const router                = express.Router();
const user                  = require('../controllers/getUser')

router.route('/')
    .get(user)

module.exports=router;