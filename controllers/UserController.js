const mongodb = require('mongodb');
const User = require('../models/user');
const ObjectId = mongodb.ObjectId;

exports.getAllUsers = (req, res, next) => {
    const isLogedIn =  req.get('Cookie').split(';')[2].trim().split('=')[1];
    User.fetchAll().then(users => {
        res.render('user/list', {
            users: users,
            pageTitle: 'User List',
            path: 'user/list', 
            hasUsers: users.length > 0,
            activeShop: true,
            productCss: true,
            isAuthenticated:isLogedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.addUser = (req, res, next) => {
    const isLogedIn =  req.get('Cookie').split(';')[2].trim().split('=')[1];
    res.render('user/add', {
        pageTitle: 'Add User',
        path: '/user/add',
        isAuthenticated:isLogedIn
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

exports.editUser = (req, res, next) => {
    const userId = req.params.userId;
    console.log("Edit Hit User");
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.redirect('/user/list');
            }
            res.render('user/edit', {
                user: user,
                pageTitle: 'Edit Shop',
                path: 'user/edit/:userId',
                activeShop: true,
                userCss: true
            });
        })
        .catch(err => console.log(err));
}


exports.updateUser = (req, res, next) => {
    const userId = req.body.userId;
    const _userName = req.body.username;
    const _email = req.body.email;
    const user = new User(new ObjectId(userId), _userName, _email);
    user.Update();
    res.redirect('/user/list');
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.deleteById(userId)
        .then(user => {
            if (!user) {
                return res.redirect('/user/list');
            }
            return res.redirect('/user/list');
        })
        .catch(err => console.log(err));
};