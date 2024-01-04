const path = require('path');
const express = require('express');
const feedContoller = require('../../controllers/api/FeedContoller');
const router = express.Router();
const multer = require("multer");
const isAuth = require("../../middleware/is-apiAuth");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
}).single("image");


router.get('/getAll', isAuth, feedContoller.getProducts);
router.post('/create-product', isAuth, upload, feedContoller.createProduct);
router.get('/product/:product_id', isAuth, feedContoller.getProduct);
router.delete('/delete/:product_id', isAuth, feedContoller.delete);



module.exports = router;