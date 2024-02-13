const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const products = [];
const p = path.join(rootDir, 'data', 'product.json');

module.exports = class Product {
    constructor(title,imgUrl,price,description) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id =  Math.random();
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        const p = path.join(rootDir, 'data', 'product.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
    static findById(id,cb) {
    }
};