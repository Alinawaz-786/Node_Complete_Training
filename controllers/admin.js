const Product = require('../models/products');
const mongoose = require('mongoose');
const fileHelper = require('../util/file');
const ITEM_PER_PAGE = 2;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
    });
}

exports.postAddProduct = (req, res, next) => {
    let _userId = String(req.session.user._id);
    const product = new Product({
        // _id: new mongoose.Types.ObjectId('6454d14c0e94b3a52e48a75c'),
        title: req.body.title,
        imgUrl: req.file.path,
        price: req.body.price,
        description: req.body.description,
        user_id: _userId,
    });

    if (!product.imgUrl) { //Add validation in this
        res.redirect('/admin/add-product');
    }
    console.log(product)
    // product.imgUrl = product.imgUrl.path;
    product.save().then(result => {
        res.redirect('/admin/list-product');
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });
}

exports.getProducts = (req, res, next) => {
    // console.log(req.session);
    let totalItems;
    const page =  +req.query.page || 1;
    console.log("*********************")
    console.log(page)
    Product.find().count().then(numProducts => {
        totalItems = numProducts;
        return Product.find().skip((page - 1) * ITEM_PER_PAGE).limit(ITEM_PER_PAGE);

    }).then(products => {
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'Products List',
                path: '/admin/products',
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

exports.getEditProduct = (req, res, next) => {
    const ProID = req.params.productId;
    Product.findById(ProID)
        .then(product => {
            console.log(req.session.user._id);
            var id = mongoose.Types.ObjectId(req.session.user._id);
            console.log(id.toString());

            if (!product && product.user_id !== String(req.session.user._id)) {
                return res.redirect('/');
            }
            res.render('shop/product-detail', {
                prods: product,
                pageTitle: 'Edit Shop',
                path: 'admin/edit-product/:productId',
                activeShop: true,
                productCss: true,
                csrfToken: req.csrfToken(),
                isAuthenticated: req.session.isLoggedIn

            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error)
        });
}

exports.updateProduct = (req, res, next) => {
    const ProID = req.body.productId;
    const updateTitle = req.body.title;
    const updateImgUrl = req.file.path;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    // if(updateImgUrl){
    //     updateImgUrl = req.file.path;
    // }
    // console.log(req.body);
    console.log("*******************************************")
    Product.findById(ProID).then(product => {
        product.title = updateTitle;
        if (updateImgUrl) {
            fileHelper.deleteFile(updateImgUrl);
        }
        product.imgUrl = updateImgUrl;
        product.price = updatePrice;
        product.description = updateDescription;
        console.log(product);
        product.save();
    }).then(result => {
        res.redirect('/admin/list-product');
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });
}

exports.deleteProductItem = (req, res, next) => {
    const ProID = req.params.productId;
    // Delete file from server
    Product.findById(ProID).then(product => {
        fileHelper.deleteFile(product.imgUrl);
    }).catch(err => next(err));

    Product.findByIdAndRemove(ProID).then(product => {
        if (!product) {
            return res.redirect('/admin/list-product');
        }
        return res.redirect('/admin/list-product');
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });
};