const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Page',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    const _email = req.body.email;
    const _password = req.body.password;
    
    User.findOne({ email: _email }).then(userExist => {
        if(!userExist){
            res.redirect('/login');
        }
        bcrypt.compare(_password, userExist.password)
        .then(doMatch =>{
            if(doMatch ){
                req.session.isLoggedIn = true;
                req.session.user = userExist;
                return req.session.save(err=>{
                    res.redirect('/');
                });
            }
            res.redirect('/login');
        })
    });


};

exports.getSignUp = (req, res, next) => {
    res.render('auth/signUp', {
        path: '/signUp',
        pageTitle: 'SignUp Page',
        isAuthenticated: false
    });
};


exports.postSignUp = (req, res, next) => {
    // const _fullname = req.body.fullname;
    const _email = req.body.email;
    const _password = req.body.password;
    // const _conformedPassword = req.body.conformedPassword;
    if (req.body.conformedPassword != req.body.password) {
        res.send("Password Issues");
    }
    var _fullname = _email.split('@');
    var fullName = _fullname[0];

    User.findOne({ email: _email }).then(userExist => {
        if (userExist) {
            return res.redirect('/signUp');
        }
        return bcrypt.hash(_password, 12)
            .then(hashPassword => {
                const user = new User({
                    name: fullName,
                    email: _email,
                    password: hashPassword,
                    cart: { items: [] }
                });
                return user.save();
            }).then(result => {
                res.redirect('/login');
            })

    }).catch(err => {
        console.log(err);
    });
};




exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(req.session.user);
        res.redirect('/login');
    });
};