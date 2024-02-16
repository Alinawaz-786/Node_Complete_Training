const Sequelize =  require('sequelize');
const sequelize =  require('../utils/database');

const User =  sequelize.default('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
    },
    email:{
        type: Sequelize.P,
        unique:true,
        allowNull:false,
    },

})
module.exports =  User;