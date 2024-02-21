const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:Sequelize.INTEGER,
});

User.hasMany(Order, {foreignKey: 'userId', constraints: true, onDelete: 'CASCADE'});

module.exports = Order;