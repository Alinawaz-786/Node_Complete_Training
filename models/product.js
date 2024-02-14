const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const Cart = require('./cart');

const products = [];
const p = path.join(rootDir, 'data', 'product.json');
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(id, title, imgUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
    }


    save() {
        getProductsFromFile(products => {
            console.log(this.id);
            if (this.id) {
                const existProductIndex = products.findIndex(p => p.id === this.id);
                const UpdateProduct = [...products];
                console.log("UpdateProduct", UpdateProduct);
                UpdateProduct[existProductIndex] = this;
                // console.log("this", UpdateProduct);

                fs.writeFile(p, JSON.stringify(UpdateProduct), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();

                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => Number(p.id) === Number(id));
            cb(product);
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            const UpdateProduct = products.filter(p => p.id !== id);
            console.log(UpdateProduct);
            fs.writeFile(p, JSON.stringify(UpdateProduct), (err) => {
                if (!err) {
                    Cart.deleteCart(id, product.price);
                }
                console.log(err);
            });
        });
    }


};