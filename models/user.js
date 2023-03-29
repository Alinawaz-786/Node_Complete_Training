const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, require: true }
        }]
    }
});

userSchema.methods.AddToCart = function (product) {
    // console.log(product);
    const _cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let _newQuantity = 1;
    const _updateCardItems = [...this.cart.items];

    if (_cartProductIndex >= 0) {
        _newQuantity = this.cart.items[_cartProductIndex].quantity + 1;
        _updateCardItems[_cartProductIndex].quantity = _newQuantity;
    } else {
        _updateCardItems.push({ productId: product._id, quantity: 1 });
    }
    const _updateCart = { items: _updateCardItems };
     this.cart = _updateCart;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// module.exports = class User {

//     constructor(id, username, email, cart) {
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.username = username;
//         this.email = email;
//         this.cart = cart;
//     }

//     addOrder() {
//         const _db = getDb();
//         return this.getCart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new mongodb.ObjectId(this._id),
//                     email: req.user.email
//                 }
//             };
//             return _db.collection('orders').insertOne(order);
//         }).then(result => {
//             this.cart = { items: [] };
//             return _db.collection('users')
//                 .updateOne({ _id: new mongodb.ObjectId(this._id) }, {
//                     $set: { cart: { items: [] } }
//                 });
//         });
//     }

//     getOrder() {
//         const _db = getDb();
//         console.log(this._id);
//         return _db.collection('orders')
//             .find({ 'user._id': this._id }).toArray();
//     }

//     getCart() {
//         const _db = getDb();
//         const _productIds = (this.cart.items || []).map(i => {
//             return i.productID;
//         });
//         return _db.collection('products')
//             .find({
//                 _id: { $in: _productIds }
//             }).toArray().
//         then(products => {
//             return products.map(p => {
//                 return {
//                     ...p,
//                     quantity: this.cart.items.find(i => {
//                         return i.productID.toString() === p._id.toString();
//                     }).quantity

//                 }
//             })
//         }).catch();

//     }
//     deleteItemFromCart(productID) {
//         const _db = getDb();
//         const _updatedCartItems = this.cart.items.filter(item => {
//             return item.productID.toString() !== productID.toString();
//         });
//         console.log(_updatedCartItems);
//         return _db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: _updatedCartItems } });

//     }
//     AddToCart(product) {
//         const _db = getDb();
//         const _cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productID.toString() === product._id.toString();
//         });
//         let _newQuantity = 1;
//         const _updateCardItems = [...this.cart.items];

//         if (_cartProductIndex >= 0) {
//             _newQuantity = this.cart.items[_cartProductIndex].quantity + 1;
//             _updateCardItems[_cartProductIndex].quantity = _newQuantity;
//         } else {
//             _updateCardItems.push({ productID: new mongodb.ObjectId(product._id), quantity: 1 });
//         }

//         // const _updateCart = {
//         //     items: [{ productID: new mongodb.ObjectId(product._id), quantity: 1 }]
//         // };
//         const _updateCart = { items: _updateCardItems };
//         return _db.collection('users').updateOne({ _id: this._id }, { $set: { cart: _updateCart } });
//     }

//     Save() {
//         const db = getDb();
//         db.collection('users').insertOne(this).then(result => {
//             console.log(result);
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection('users').find().toArray()
//             .then(users => {
//                 return users;
//             }).catch(err => {
//                 console.log(err);
//             });
//     }

//     Update() {
//         const db = getDb();
//         if (this._id) {
//             db.collection('users').updateOne({ _id: this._id }, { $set: this }).then(result => {
//                 console.log(result);
//             }).catch(err => {
//                 console.log(err);
//             })
//         }
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users')
//             .find({
//                 _id: new mongodb.ObjectId(userId)
//             }).next()
//             .then(user => {
//                 return user;
//             }).catch(err => {
//                 console.log(err);
//             });
//     }

//     static deleteById(userId) {
//         const db = getDb();
//         return db.collection('users')
//             .deleteOne({
//                 _id: new mongodb.ObjectId(userId)
//             })
//             .then(user => {
//                 return user;
//             }).catch(err => {
//                 console.log(err);
//             });
//     }
// }