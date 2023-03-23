exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Page',
        isAuthenticated: false
    });

};

exports.getSignUp = (req, res, next) => {
    res.render('auth/signUp', {
        path: '/login',
        pageTitle: 'Login Page',
        isAuthenticated: false
    });

};


exports.postSignUp = (req, res, next) => {

};


exports.postLogin = (req, res, next) => {
    return res.redirect('/');
};