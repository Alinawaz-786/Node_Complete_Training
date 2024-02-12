const path = require('path');
const rootDir = require('../../utils/path');
const Product = require('../../models/Product');


exports.index = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('index', {
            productList: products,
            pageTitle: 'Product List',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

exports.carts = (req, res, next) => {};
exports.checkout = (req, res, next) => {};

exports.shop = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/shop', {
            productList: products,
            pageTitle: 'Product Shopping',
            path: '/shop',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};