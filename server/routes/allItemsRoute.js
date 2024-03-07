const express       = require('express');
const router        = express.Router();
const auth          = require('../middleware/auth');
const getAllItems   = require('../controllers/getAllItems')

router.route('/')
    .get(auth, getAllItems)

module.exports = router;