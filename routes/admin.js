const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);
router.get('/list-product', isAuth, adminController.getProducts);
router.post('/add-product', isAuth, adminController.postAddProduct)
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
router.post('/edit-product', isAuth, adminController.updateProduct);
router.get('/delete-product/:productId', isAuth, adminController.deleteProductItem);


module.exports = router;