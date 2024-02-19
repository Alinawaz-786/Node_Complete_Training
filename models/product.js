const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

User.hasMany(Product, {foreignKey: 'userId', constraints: true, onDelete: 'CASCADE'});

module.exports = Product;