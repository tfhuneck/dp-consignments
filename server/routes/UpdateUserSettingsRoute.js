const express               = require('express');
const router                = express.Router();
const update                = require('../controllers/updateUserSettings')


router.route('/')
    .post(update)

module.exports=router;