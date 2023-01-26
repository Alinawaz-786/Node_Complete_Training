const path = require('path');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');


router.get('/list', userController.getAllUsers);
router.get('/add', userController.addUser);
router.post('/add', userController.saveUser)

// router.get('/edit-product/:productId', adminController.getEditProduct);
// router.post('/edit-product', adminController.updateProduct);

// router.get('/delete-product/:productId', adminController.deleteProductItem);


module.exports = router;