const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER,
});


Cart.belongsToMany(Product, {through: CartItem, foreignKey: 'cartId', constraints: true, onDelete: 'CASCADE'});
Product.belongsToMany(Cart, {through: CartItem, foreignKey: 'productId', constraints: true, onDelete: 'CASCADE'});


module.exports = CartItem;