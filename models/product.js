const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const products = [];
const getProductForFile = cb => {
    const p = path.join(rootDir, 'data', 'product.json');
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(title, imgUrl, price, description) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random();
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

    static findById(id, cb) {
        console.log('Id',id)
        getProductForFile(products => {
            console.log("inner",products);
            const product = products.find(p => p.id === id);
            console.log("outer",product);

            cb(product);
        });
    }
};