const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const AdminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log("shop", AdminData.products);
    res.render('shop', {
        prods: AdminData.products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: AdminData.products.length > 0,
        activeShop: true,
        productCss: true
    });
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // res.sendFile(path.join(rootDir, '../', 'views', 'shop.html'));
    // console.log("In to middleware");
    // res.send('<h1>This is the middleware Response');
    // next();
});

module.exports = router;