const express = require('express');
const router = express.Router();
const productController = require('../controllers/shop/ProductController');

router.get('/', productController.index);
router.get('/carts', productController.getCarts);
router.get('/orders', productController.getOrders);
router.get('/checkout', productController.checkout);



exports.router = router;