// const fs = require('fs');
// const path = require('path');

// const p = path.join(path.dirname(process.mainModule.filename), 'data', 'carts.json');

// module.exports = class Carts {
//     static AddToCartProduct(id, productPrice) {
//         fs.readFile(p, (err, fileContent) => {
//             let cart = { products: [], totalPrice: 0 };
//             if (!err) {
//                 cart = JSON.parse(fileContent);
//             }
//             const existingProductIndex = cart.products.find(prod => prod.id === id);
//             const existingProduct = cart.products[existingProductIndex];
//             let updateProduct;
//             if (existingProduct) {
//                 updateProduct = {...existingProduct }
//                 updateProduct.qty = updateProduct.qty + 1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProduct]
//             } else {
//                 updateProduct = { id: id, qty: 1 };
//                 cart.products = [...cart.products, updateProduct];
//             }
//             cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);
//             fs.writeFile(p, JSON.stringify(cart), err => {
//                 console.log(err);
//             });
//         });

//     }
//     static getCart(cb) {
//         fs.readFile(p, (err, fileContent) => {
//             const cart = JSON.parse(fileContent);
//             if (err) {
//                 cb(null);
//             } else {
//                 cb(cart);
//             }
//         });
//     }
// }