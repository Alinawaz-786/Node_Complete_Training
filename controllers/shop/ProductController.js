const path = require('path');
const rootDir = require('../../utils/path');
const Product = require('../../models/Product');
const Cart = require('../../models/cart');


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
    Cart.getCart(cart => {
        const cartProduct = [];
        Product.fetchAll(product => {
            for (let index = 0; index < product.length; index++) {
                const cartProductData = cart.products.find(prod => prod.id === product[index].id);
                if (cartProductData) {
                    cartProduct.push({ productData: product[index], qty: cartProductData.qty });
                }
            }
            console.log(cartProduct);
            res.render('shop/cart', {
                pageTitle: 'Product Carts',
                products: cartProduct,
                path: '/cart',
                activeShop: true,
                productCSS: true
            });
        });
       
    });
   
};

exports.postCarts = (req, res, next) => {
    const product_id = req.body.product_id;
    Product.findById(product_id, (product) => {
        Cart.AddToCart(product_id, product.price);
    });
    res.redirect('/carts');

};

exports.getOrders = (req, res, next) => { };
exports.checkout = (req, res, next) => { };

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