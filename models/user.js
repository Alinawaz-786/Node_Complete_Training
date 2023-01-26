const mongodb = require('mongodb');
const getDB = require('../util/database').getDb;

module.exports = class User {

    constructor(id, username, email) {
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.username = username;
        this.email = email;
    }

    Save() {
        const db = getDB();
        db.collection('users').insertOne(this).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('users').find().toArray()
            .then(users => {
                return users;
            }).catch(err => {
                console.log(err);
            });
    }

    static Update() {
        const db = getDb();
        if (this._id) {
            db.collection('users').updateOne({ _id: this._id }, { $set: this }).then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .find({
                _id: new mongodb.ObjectId(userId)
            }).next()
            .then(user => {
                console.log(user);
                return user;
            }).catch(err => {
                console.log(err);
            });
    }

    static deleteById(userId) {
        const db = getDb();
        return db.collection('users')
            .deleteOne({
                _id: new mongodb.ObjectId(userId)
            })
            .then(user => {
                console.log(user);
                return user;
            }).catch(err => {
                console.log(err);
            });
    }
}