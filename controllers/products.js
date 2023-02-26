const Product = require('../models/products');
const Cart = require('../models/carts');


exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'Products List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true
            });
        });
}


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


exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.addOrder().then(result => {
        res.redirect('/cart');
    }).catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    console.log("controller");
    req.user.getOrder()
        .then(orders => {
            console.log("orders");
            console.log(orders);
            res.render('shop/orders', {
                path: '/order',
                pageTitle: 'Your Order',
                order: orders
            });
        }).catch(err => console.log(err));

};

exports.postCart = (req, res, next) => {
    const ProID = req.params.productId;
    Product.findById(ProID).then(product => {
        return req.user.AddToCart(product);
    }).then(result => {
        res.redirect('/cart');
    })
}

exports.getCart = (req, res, next) => {
    // console.log(req.user.cart);
    req.user.populate('cart.items.productId')
    .then(user => {
        console.log(user.cart.items);
        const products = user.cart.items;
        res.render('shop/carts', {
            path: '/cart',
            pageTitle: 'Your Carts',
            products: products
        });
    }).catch(err => console.log(err));
}

exports.deleteCartItem = (req, res, next) => {
    const _proID = req.params.productId;
    console.log("_proID");
    console.log(_proID);
    req.user.deleteItemFromCart(_proID).then(result => {
        res.redirect('/cart');
    }).catch(err => console.log(err));
}

exports.getCheckOut = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'

    });
}