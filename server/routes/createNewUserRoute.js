const express               = require('express');
const router                = express.Router();
const user                  = require('../controllers/createNewUser')

router.route('/')
    .post(user);

module.exports = router;