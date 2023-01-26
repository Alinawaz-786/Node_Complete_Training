const mongodb = require('mongodb');
const User = require('../models/user');
const ObjectId = mongodb.ObjectId;

exports.getAllUsers = (req, res, next) => {
    User.fetchAll().then(users => {
            res.render('user/list', {
                users: users,
                pageTitle: 'User List',
                path: '/',
                hasUsers: users.length > 0,
                activeShop: true,
                productCss: true
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.addUser = (req, res, next) => {
    res.render('user/add', {
        pageTitle: 'Add User',
        path: '/user/add'
    });
}

exports.saveUser = (req, res, next) => {
    console.log("Save Hit");
    const _user = new User(null, req.body.username, req.body.email);
    console.log("Save _user");
    console.log(_user);
    _user.Save();
    res.redirect('/user/list');
}