const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    // console.log(authHeader);
    if(!authHeader){
        req.isAuth = false;
        return next();
        // const error = new Error('Not Authenicated.');
        // error.statusCode = 401;
        // throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken ;

    try {
        decodedToken = jwt.verify(token,'somesupersecretsecret');
    } catch (err) {
        req.isAuth = false;
        return next();

        // err.statusCode = 500;
        // throw err;
    } 
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    
    req.userId =  decodedToken.userId;
    req.isAuth =  true;;
    // console.log(req.userId);
    next();
};