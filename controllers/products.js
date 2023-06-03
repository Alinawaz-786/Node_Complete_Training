const fs = require('fs');
const path = require('path');
const pdfDocument = require('pdfkit');
const Product = require('../models/products');
const Cart = require('../models/carts');
const ITEM_PER_PAGE = 2;

exports.getProducts = (req, res, next) => {
    // console.log(req.session);
    let totalItems;
    const page =  +req.query.page || 1;
    Product.find().count().then(numProducts => {
        totalItems = numProducts;
        return Product.find().skip((page - 1) * ITEM_PER_PAGE).limit(ITEM_PER_PAGE);

    })
        .then(products => {
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'Products List',
                path: '/',
                currentPage:page,
                hasNextPage:ITEM_PER_PAGE*page <totalItems,
                hasPreviousPage:page>1,
                nextPage:page+1,
                previousPage:page+1,
                lastPage:Math.ceil(totalItems / ITEM_PER_PAGE),
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true,
                isAuthenticated: req.session.isLoggedIn
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
            isAuthenticated: req.session.isLoggedIn
        });
    })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error)
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
            isAuthenticated: req.session.isLoggedIn
        });
    })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error)
        });
}

exports.postOrder = (req, res, next) => {
    req.user.addOrder().then(result => {
        res.redirect('/cart');
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });
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
                isAuthenticated: req.session.isLoggedIn
            });
        }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });

};

exports.postCart = (req, res, next) => {
    const ProID = req.params.productId;
    Product.findById(ProID).then(product => {
        console.log(product);
        console.log(req.user);
        // return req.user.AddToCart(product);
    }).then(result => {
        res.redirect('/cart');
    })
}

exports.getCart = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];


    // req.user.populate('cart.items.productId')
    //     .then(user => {
    //         const products = user.cart.items;
    //         res.render('shop/carts', {
    //             path: '/cart',
    //             pageTitle: 'Your Carts',
    //             products: products,
    //             isAuthenticated: req.session.isLoggedIn
    //         });
    //     }).catch(err => console.log(err));
}

exports.deleteCartItem = (req, res, next) => {
    const _proID = req.params.productId;
    req.user.deleteItemFromCart(_proID).then(result => {
        res.redirect('/cart');
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });
}

exports.getCheckOut = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];

    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.getInvoice = (req, res, next) => {
    const OrderId = req.params.orderId;
    Order.findById(OrderId).then(order => {
        if (!order) {
            return next(new Error('No Order Found.'));
        }
        if (order.user.userId.toString() !== req.user._id.toString()) {
            return next(new Error('Unauthorized'));
        }
        const invoiceName = 'invoice-' + OrderId + '.pdf';
        const invoicePath = path.join('data', 'invoices', invoiceName);
        //Method 1
        // fs.readFile(invoicePath, (err, data) => {
        //     if (err) {
        //         return next(err);
        //     }
        //     res.setHeader('Content-Type', 'application/pdf');
        //     res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
        //     res.send(data);
        // });

        //Method 2
        // const file = fs.createReadStream(invoicePath);
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
        // file.pipe(res);

        /*
         * Method 3
         *  New Package PDF Kit
         */
        const pdfDoc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
        pdfDoc.pipe(fs.createReadStream(invoiceName));
        pdfDoc.pipe(res);
        pdfDoc.text('Hello Worlds!');
        // Design PDF
        pdfDoc.fontSize(12).text('Invoice', {
            underline: true
        });
        pdfDoc.text('--------------------------------');
        let totalPrice = 0;
        order.products.forEach(prod => {
            totalPrice += prod.quantity * prod.product.price;
            pdfDoc.text(
                prod.product.title + '-' + prod.quantity + 'x' + '$' + prod.product.price
            );
        });

        pdfDoc.text('Total Price: ');
        pdfDoc.text();
        pdfDoc.end();

    }).catch(err => next(err));

};