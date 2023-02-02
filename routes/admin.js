const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.get('/list-product', adminController.getProducts);
router.post('/add-product', adminController.postAddProduct)
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.updateProduct);
router.get('/delete-product/:productId', adminController.deleteProductItem);


module.exports = router;