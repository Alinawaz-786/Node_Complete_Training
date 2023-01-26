const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

module.exports = class Product {
    constructor(id, title, imgUrl, price, description) {
        this._id = new mongodb.ObjectId(id);
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
    }
    Save() {
        const db = getDb();
        db.collection('products').insertOne(this).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }

    Update() {
        const db = getDb();
        if (this._id) {
            db.collection('products').updateOne({ _id: this._id }, { $set: this }).then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => {
                console.log("products list");
                console.log(products);
                return products;
            }).catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({
                _id: new mongodb.ObjectId(prodId)
            }).next()
            .then(product => {
                console.log(product);
                return product;
            }).catch(err => {
                console.log(err);
            });
    }
    
    static deleteById(prodId){
        const db = getDb();
        return db.collection('products')
        .deleteOne({
            _id: new mongodb.ObjectId(prodId)
        })
        .then(product => {
            console.log(product);
            return product;
        }).catch(err => {
            console.log(err);
        });

    }
}