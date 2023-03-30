const express = require('express');
const multer = require('multer');
const router = express.Router();
const homeController  = require('../controller/home_controller');
const path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
    });

const upload = multer({storage:storage})
router.get('/',homeController.home);

router.post('/extracttextfromimage', upload.single('file'), homeController.convert);


module.exports = router;