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
    console.log("gooooooooooo");
    const product_name = req.body.productName;
    const description = req.body.description;
    const price = req.body.price;
    const qty = req.body.qty;
    console.log(qty);
    // res.status(200).json({
    //     message:['Post Create Successfully'],
    //     post: [{ "_id": 2, product_name: product_name, description: description, price: price, qty: qty, "createdAt": new Date() }]
    // });
}


