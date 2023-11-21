const fs = require('fs');
const path = require('path');
const pdfDocument = require('pdfkit');
const Product = require('../../models/products');
const { validationResult, Result } = require('express-validator');
const User = require('../../models/user');



exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
        console.log(products);
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

    const qty = req.body.qty;
    const price = req.body.price;
    const description = req.body.description;
    const title = req.body.title;
    const imgUrl = req.body.image;

    const product = new Product({
        qty: qty,
        price: price,
        title: title,
        description: description,
        imgUrl: imgUrl,
    })
    console.log(product);
    // product.save().then(result => {
    //     res.status(200).json({
    //         message: ['Product Create Successfully'],
    //         product: result
    //     });
    // }).catch(err => {
    //     if(!err.statusCode){
    //         err.statusCode= 500;
    //     }
    //     next(err);
    // })
}

exports.getProduct = (req, res, next) => {
    const product_id = req.params.product_id;
    Product.findById(product_id).then(product => {
        if (!product) {
            const error = new Error('Could not find Product');
            error.statusCode = 404;
            throw error;
        }
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}


