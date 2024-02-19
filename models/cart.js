const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:Sequelize.INTEGER,
});

User.hasOne(Cart, {foreignKey: 'userId', constraints: true, onDelete: 'CASCADE'});

module.exports = Cart;