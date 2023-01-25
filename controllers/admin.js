const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(null, req.body.title, req.body.imgUrl, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true
        });
    });
}

exports.getEditProduct = (req, res, next) => {
    const ProID = req.params.productId;
    Product.findById(ProID)
        .then(product => {
            res.render('shop/product-detail', {
                prods: product,
                pageTitle: 'Edit Shop',
                path: 'admin/edit-product/:productId',
                activeShop: true,
                productCss: true
            });
        })
        .catch(err => {
            console.log(err);
        });
    // Product.findById(ProID) => {
    //     res.render('shop/product-detail', {
    //         prods: product,
    //         pageTitle: 'Edit Shop',
    //         path: 'admin/edit-product/:productId',
    //         activeShop: true,
    //         productCss: true
    //     });
    //     console.log(product);
    // });
}

exports.updateProduct = (req, res, next) => {
    const ProID = req.body.productId;
    const updateTitle = req.body.title;
    const updateImgUrl = req.body.imgUrl;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    const product = new Product(ProID, updateTitle, updateImgUrl, updatePrice, updateDescription);
    product.save();
    res.redirect('/');
}

exports.deleteProductItem = (req, res, next) => {

};