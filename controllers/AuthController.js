exports.getLogin = (req, res, next) => {
    // const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    console.log(req.session);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Page',
        isAuthenticated: false
    });

};

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie','isLogedIn=true','Secure')
    // req.session.isLogedIn = true;
    return res.redirect('/');
};