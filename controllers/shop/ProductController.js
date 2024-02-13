const path = require('path');
const rootDir = require('../../utils/path');
const Product = require('../../models/Product');


exports.index = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            productList: products,
            pageTitle: 'Product List',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

exports.getCarts = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Product Carts',
        path: '/cart',
        activeShop: true,
        productCSS: true
    });
};
exports.getOrders = (req, res, next) => {};
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