const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
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
        getProductFromFile(products => {
            if (this.id) {
                const existProductIndex = products.findIndex(prod => prod.id === this.id);
                const updateProducts = [...products];
                updateProducts[existProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
                    console.log(err);
                });
            } else {
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }
    static fetchAll(cb) {
        getProductFromFile(cb);
    }
    static findById(id, cb) {
        getProductFromFile(products => {
            const product = products.find(p => p.id === id)
            cb(product);
        });
    }
    static deleteById(id) {
        getProductFromFile(products => {
            const productIndex = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (!err) {

                }
            });
        });
    }
}