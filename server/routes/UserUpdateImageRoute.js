const express               = require('express');
const router                = express.Router();
const update                = require('../controllers/updateImage');
const multer                = require('multer');
const path                  = require('path');
const upload                = multer({dest: path.join(process.cwd() + '/uploads/')});

router.route('/')
    .post(upload.single('avatar'), update)

module.exports=router;