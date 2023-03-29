const path = require('path');
const express = require('express');
const shopController = require('../controllers/products');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/', isAuth, shopController.getProducts);
// router.get('/', shopController.getIndex);
// router.get('/products', shopController.getShop);
router.get('/cart', isAuth, shopController.getCart);
// router.get('/checkout', shopController.getCheckOut);
router.get('/add-to-cart/:productId', isAuth, shopController.postCart);
// router.get('/cart-delete/:productId', shopController.deleteCartItem);
// router.get('/cart-order', shopController.postOrder);
// router.get('/get-order', shopController.getOrders);

module.exports = router;