const fs = require('fs');
const path = require('path');
const Product = require('../../models/products');
const { validationResult } = require('express-validator');

exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
        res.status(200).json({
            post: products
        })
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });


}
exports.createProduct = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed enteres data');
        error.statusCode = 422;
        throw error;

        // return res.status(422).json({
        //     message: "Validation failed enteres data",
        //     errors: errors.array()
        // })
    }
    if (!req.file) {
        const error = new Error('Validation failed enteres image');
        error.statusCode = 422;
        throw error;

    }

    const qty = req.body.qty;
    const price = req.body.price;
    const title = req.body.title;
    const imgUrl = req.file.path;
    const description = req.body.description;

    const product = new Product({
        qty: qty,
        price: price,
        title: title,
        imgUrl: imgUrl,
        description: description,
    })
    product.save().then(result => {
        res.status(200).json({
            message: ['Product Create Successfully'],
            product: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.getProduct = (req, res, next) => {
    const product_id = req.params.product_id;
    Product.findById(product_id).then(product => {
        if (!product) {
            const error = new Error('Could not find Product');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            product: product
        })

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.delete = (req, res, next) => {
    const product_id = req.params.product_id;
    console.log(product_id);
    Product.findById(product_id).then(product => {
        if (!product) {
            const error = new Error('Could not find Product');
            error.statusCode = 404;
            throw error;
        }
        clearImage(product.imgUrl)
        return Product.findByIdAndRemove(product_id);
    }).then(result =>{
        res.status(200).json({
            message: "Product Delete"
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);

    })
}

const clearImage = filePath => {
    filePath = path.join(__dirname, '..','..',filePath);
    fs.unlink(filePath, err => console.log(err))
};
