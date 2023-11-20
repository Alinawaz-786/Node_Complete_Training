const fs = require('fs');
const path = require('path');
const pdfDocument = require('pdfkit');
const Product = require('../../models/products');
const { validationResult, Result } = require('express-validator');
const User = require('../../models/user');



exports.getProducts = (req, res, next) => {
    const product = new Product();
    Product.fetchAll().then(products => {
    console.log(product);
        
    }) .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    });

    res.status(200).json({
        post: [{ "_id": 1, product_name: "Laptop", description: "This is the testing.", price: "12", qty: "2", "createdAt": new Date() }]
    });
}
exports.createProduct = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed enteres data');
        error.statusCode =  422;
        throw error;

        // return res.status(422).json({
        //     message: "Validation failed enteres data",
        //     errors: errors.array()
        // })
    }

    const qty = req.body.qty;
    const price = req.body.price;
    const description = req.body.description;
    const product_name = req.body.productName;
    const imgUrl = req.body.image;

    const product = new Product({
        qty: qty,
        price: price,
        title: product_name,
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


