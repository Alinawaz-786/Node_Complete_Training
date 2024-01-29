const path = require('path');
const express = require('express')
const router = express.Router();
const shopProduct = require('./shop');
const rootDir = require('../utils/path');

router.get('/home', (req, res, next) => {

    res.render('shop', {
        productList: shopProduct.products,
        pageTitle: 'Product List',
        path: '/',
        hasProducts: shopProduct.products.length > 0,
        activeShop: true,
        productCSS: true
    });
    // console.log("Admin Js .", shopProduct.products,path.join(rootDir, 'views', 'shop.html'));
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

router.get('/deshboard', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>')
});

module.exports = router;