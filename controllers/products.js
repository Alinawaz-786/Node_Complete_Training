const Product = require('../models/products');
const Cart = require('../models/carts');

exports.getShop = (req, res, next) => {
    Product.fetchAll().then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postCart = (req, res, next) => {
    const ProID = req.params.productId;
    Product.findById(ProID, (product) => {
        Cart.AddToCartProduct(ProID, product.price);
    });
    res.redirect('/');
}

exports.getCart = (req, res, next) => {
    Cart.getCart(carts => {
        Product.fetchAll(products => {
            const CartProducts = [];
            for (const product of products) {
                const cartProductData = carts.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    CartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/carts', {
                path: '/cart',
                pageTitle: 'Your Carts',
                products: CartProducts
            });
        });
    });

}

exports.getCheckOut = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'

    });
}