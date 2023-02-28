const Product = require('../models/products');
const Cart = require('../models/carts');


exports.getProducts = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];

    Product.find()
        .then(products => {
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'Products List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true,
                isAuthenticated: isLogedIn
            });
        });
}


exports.getShop = (req, res, next) => {
    const isLogedIn = req.get('Cookie').split('=')[1];
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    Product.fetchAll().then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true,
                isAuthenticated: isLogedIn
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getIndex = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];

    Product.fetchAll().then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true,
                isAuthenticated: isLogedIn
            });
        })
        .catch(err => {
            console.log(err);
        });
}


exports.postOrder = (req, res, next) => {
    req.user.addOrder().then(result => {
        res.redirect('/cart');
    }).catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];

    req.user.getOrder()
        .then(orders => {
            res.render('shop/orders', {
                path: '/order',
                pageTitle: 'Your Order',
                order: orders,
                isAuthenticated: isLogedIn
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
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];


    req.user.populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            res.render('shop/carts', {
                path: '/cart',
                pageTitle: 'Your Carts',
                products: products,
                isAuthenticated: isLogedIn
            });
        }).catch(err => console.log(err));
}

exports.deleteCartItem = (req, res, next) => {
    const _proID = req.params.productId;
    req.user.deleteItemFromCart(_proID).then(result => {
        res.redirect('/cart');
    }).catch(err => console.log(err));
}

exports.getCheckOut = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];

    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        isAuthenticated: isLogedIn
    });
}