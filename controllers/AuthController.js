const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid');
const User = require('../models/user');
const { reset } = require('nodemon');


const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Page',
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken(),
        errorMessage: message
    });
};

exports.postLogin = (req, res, next) => {
    const _email = req.body.email;
    const _password = req.body.password;

    User.findOne({ email: _email }).then(userExist => {
        if (!userExist) {
            req.flash('error', 'Invalid Email or password')
            res.redirect('/login');
        }
        bcrypt.compare(_password, userExist.password)
            .then(doMatch => {
                if (doMatch) {
                    req.session.isLoggedIn = true;
                    req.session.user = userExist;
                    return req.session.save(err => {
                        res.redirect('/');
                    });
                }
                res.redirect('/login');
            })
    });
};

exports.getSignUp = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/signUp', {
        path: '/signUp',
        pageTitle: 'SignUp Page',
        isAuthenticated: false,
        csrfToken: req.csrfToken(),
        errorMessage: message
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
                transporter.sendMail({
                    to: _email,
                    from: 'alinawaz1857@gmail.com',
                    subject: 'Signup succeeded',
                    html: '<h1>You are successfully signed up!</h1>'
                });
                res.redirect('/login');
            })

    }).catch(err => {
        console.log(err);
    });
};

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    // Get and Set
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Page',
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken(),
        errorMessage: message
    });
};

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email }).then(user => {
            if (!user) {
                req.flash('error', 'No Account with that email find');
                return res.redirect('/reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
        }).then(result => {
            transporter.sendMail({
                to: req.body.email,
                from: 'alinawaz1857@gmail.com',
                subject: 'Forgot Password',
                html: `
                <p>You requested for Password Reset</p>
                <p> <a href="http://localhost:4000/reset/${token}">Reset your password</a></p>
                `
            });
        })
            .catch(err => {
                console.log(err);
            })
    })
};

exports.getNewPassowrd = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } }).then(user => {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        // Get and Set
        res.render('auth/reset', {
            path: '/reset',
            pageTitle: 'Reset Page',
            isAuthenticated: req.session.isLoggedIn,
            csrfToken: req.csrfToken(),
            errorMessage: message,
            userId: user._id.toString(),
            passwordToken: token,
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.postNewPassowrd = (req, res, next) => {
    const _userId = req.body.userId;
    const _passwordToken = req.body.passwordToken;
    const _password = req.body.password;
    let resetUser;
    User.findOne({ resetToken: _passwordToken, _id: _userId, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(_password, 12);
        }).then(hashPassword => {
            resetUser.password = hashPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        }).then(result => {
            return res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        // console.log(req.session.user);
        res.redirect('/login');
    });
};