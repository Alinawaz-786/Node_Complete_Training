
exports.getLogin = (req, res, next) => {
    const isLogedIn =  req.get('Cookie').split(';')[2].trim().split('=')[1];
    console.log(isLogedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Page',
        isAuthenticated:isLogedIn
    });

};

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie','isLogedIn=true','Secure')
    return res.redirect('/');
};


  