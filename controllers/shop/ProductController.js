const path = require('path');
const rootDir = require('../../utils/path');
const Product = require('../../models/Product');
const CartItem = require('../../models/CartItem');


exports.index = (req, res, next) => {

    Product.fetchAll().then(([row, fieldData]) => {
        console.log(row);
    }).catch(err => {
        console.log(err)
    })
    // Product.fetchAll(products => {
    //     res.render('shop/index', {
    //         productList: products,
    //         pageTitle: 'Product List',
    //         path: '/',
    //         hasProducts: products.length > 0,
    //         activeShop: true,
    //         productCSS: true
    //     });
    // });
};

exports.getCarts = (req, res, next) => {
    req.user.getCart().then(cart => {
        cart.getProducts()
            .then(cartProduct => {

                res.render('shop/cart', {
                    pageTitle: 'Product Carts',
                    products: cartProduct,
                    path: '/cart',
                    activeShop: true,
                    productCSS: true
                });

            }).catch(err => {
                console.log(err)
            })
    }).catch(err => {
        console.log(err)
    })
    // Cart.getCart(cart => {
    //     const cartProduct = [];
    //     Product.fetchAll(product => {
    //         for (let index = 0; index < product.length; index++) {
    //             const cartProductData = cart.products.find(prod => prod.id === product[index].id);
    //             if (cartProductData) {
    //                 cartProduct.push({ productData: product[index], qty: cartProductData.qty });
    //             }
    //         }
    //         console.log(cartProduct);
    //         res.render('shop/cart', {
    //             pageTitle: 'Product Carts',
    //             products: cartProduct,
    //             path: '/cart',
    //             activeShop: true,
    //             productCSS: true
    //         });
    //     });
    //
    // });

};

exports.postCarts = (req, res, next) => {
    const productId = req.body.product_id;
    let fetchedCart;
    req.user.getCart().then(cart => {
        return cart.getProducts({ where: { id: productId } })
    }).then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        let newQuantity = 1;
        if (product) {
            const qty = product.cartItem.quantity;
            newQuantity = qty + 1;
            return CartItem.update({
                quantity: newQuantity,
            }, { where: { id: product.cartItem.id } });
        }
        return Product.findByPk(productId).then(product => {
            return CartItem.create({
                cartId: 1,
                productId: productId,
                quantity: newQuantity,
            });
            // return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
        }).catch(err => {
            console.log(err)
        })
    })
        .catch(err => {
            console.log(err)
        });
    // Product.findById(product_id, (product) => {
    //     // Cart.AddToCart(product_id, product.price);
    // });
    res.redirect('/carts');

};

exports.getOrders = (req, res, next) => {
    req.user.getOrders({ include: ['products'] }).then(orders => {
        console.log(orders);
        res.render('shop/order', {
            orders: orders,
            pageTitle: 'Order',
            path: '/orders',
            activeShop: true,
            productCSS: true
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
    req.user.getCart().then(cart => {
        return cart.getProducts();
    }).then(products => {
        req.user.createOrder()
            .then(order => {
                return order.addProducts(
                    products.map(product => {
                        product.OrderItem = { quantity: product.cartItem.quantity };
                        return product;
                    })
                )
            }).catch(err => { console.log(err); })
    }).then(result => {
        res.redirect('/orders');
    })
        .catch(err => console.log(err));
};

exports.checkout = (req, res, next) => {
};

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