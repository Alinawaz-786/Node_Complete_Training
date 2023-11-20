const fs = require('fs');
const path = require('path');
const pdfDocument = require('pdfkit');
const Product = require('../../models/products');
const User = require('../../models/user');



exports.getProducts = (req, res, next) => {
    res.status(200).json({
        post: [{ "_id": 1, product_name: "Laptop", description: "This is the testing.", price: "12", qty: "2", "createdAt": new Date() }]
    });
}
exports.createProduct = (req, res, next) => {

    const _id = req.body._id;
    const qty = req.body.qty;
    const price = req.body.price;
    const description = req.body.description;
    const product_name = req.body.productName;

    res.status(200).json({
        message: ['Product Create Successfully'],
        product: { "_id": _id, qty: qty, price: price, "createdAt": new Date(), description: description, product_name: product_name }
    });
}


