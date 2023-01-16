const path = require('path');
const express = require('express');
const shopController = require('../controllers/products');
const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getShop);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckOut);

module.exports = router;