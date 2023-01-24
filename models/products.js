const fs = require('fs');
const path = require('path');
const getDb = require('../util/database').getDb;


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
        const db = getDb();
        db.collection('products').insertOne(this).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }

    // static fetchAll(cb) {
    //     getProductFromFile(cb);
    // }
    // static findById(id, cb) {
    //     getProductFromFile(products => {
    //         const product = products.find(p => p.id === id)
    //         cb(product);
    //     });
    // }
    // static deleteById(id) {
    //     getProductFromFile(products => {
    //         const productIndex = products.filter(prod => prod.id !== id);
    //         fs.writeFile(p, JSON.stringify(products), (err) => {
    //             if (!err) {

    //             }
    //         });
    //     });
    // }
}