const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
    // res.sendFile(path.join(rootDir, 'views', 'add-product'));
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    // console.log("In to the testing middleware");
    // res.send('<form method="POST" action="/admin/product"><input type="text" name="message"><button  type="submit">Send</button></form>');
});

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});


exports.routers = router;
exports.products = products;