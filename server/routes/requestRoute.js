const express       = require('express');
const router        = express.Router();
const auth          = require('../middleware/auth');
const postRequest   = require('../controllers/postCahoutRequest');
const getRequest    = require('../controllers/getCashoutRequest')
const cancelRequest = require('../controllers/cancelRequest')

router.route('/')
    .post(postRequest)
    .get(auth, getRequest)
    .put(cancelRequest)

module.exports = router;