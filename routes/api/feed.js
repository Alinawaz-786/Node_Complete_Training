const path = require('path');
const express = require('express');
const feedContoller = require('../../controllers/api/FeedContoller');
const router = express.Router();

router.get('/getAll', feedContoller.getProducts);
router.post('/create-product', feedContoller.createProduct);
router.post('/product/:product_id;', feedContoller.getProduct);



module.exports = router;