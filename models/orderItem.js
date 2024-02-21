const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');
const Product = require('./product');
const Order = require('./order');

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER,
});

Order.belongsToMany(Product,{through: OrderItem, foreignKey: 'ordertId', constraints: true, onDelete: 'CASCADE'});

module.exports = OrderItem;