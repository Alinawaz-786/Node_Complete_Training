const express = require('express')
const router = express.Router();
const adminProduct = require('../controllers/admin/ProductController');

router.get('/deshboard', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>')
});

router.get('/product-list', adminProduct.listItem);
router.get('/add-product', adminProduct.createItem);
router.post('/product', adminProduct.saveItem);
router.get('/edit-product/:id', adminProduct.editItem);
router.post('/update-product', adminProduct.updateItem);
router.get('/delete-product/:id', adminProduct.deleteItem);

module.exports = router;