const mongodb = require('mongodb');
const Product = require('../models/products');
const ObjectId =  mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    console.log("Save Hit");
    const product = new Product(null, req.body.title, req.body.imgUrl, req.body.price, req.body.description);
    console.log("Save Product");
    console.log(product);
    product.Save();
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
    console.log("Edit Hit");
    Product.findById(ProID)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('shop/product-detail', {
                prods: product,
                pageTitle: 'Edit Shop',
                path: 'admin/edit-product/:productId',
                activeShop: true,
                productCss: true
            });
        })
        .catch(err => console.log(err));
}

exports.updateProduct = (req, res, next) => {
    const ProID = req.body.productId;
    const updateTitle = req.body.title;
    const updateImgUrl = req.body.imgUrl;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    const product = new Product(new ObjectId(ProID), updateTitle, updateImgUrl, updatePrice, updateDescription);
    product.Update();
    res.redirect('/');
}

exports.deleteProductItem = (req, res, next) => {
    const ProID = req.params.productId;
    Product.deleteById(ProID)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            return res.redirect('/');
        })
        .catch(err => console.log(err));
};