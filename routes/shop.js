const path = require('path');
const express = require('express');
const rootDir = require('../utils/path');

const router = express.Router();
const products = [];

router.get('/', (req, res, next) => {
    res.send("Well come")
});

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/add-product',
        activeShop: true,
        productCSS: true
    });

    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

router.post('/product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/admin/home');
});

exports.router = router;
exports.products = products;