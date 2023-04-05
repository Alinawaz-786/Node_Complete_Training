const path = require('path');
const express = require('express');
const AuthController = require('../controllers/AuthController');
const isAuth = require('../middleware/is-auth');
const { check,body } = require('express-validator');
const router = express.Router();

router.get('/login', AuthController.getLogin);
router.get('/signUp', AuthController.getSignUp);
router.post('/login', AuthController.postLogin);
router.post('/signUp',
    [
        check('email').isEmail().
            withMessage('Please enter the validate Email').
            custom((value, { req }) => {
                if (value === 'test@test.com') {
                    throw new Error("This email is not use for.")
                }
                return true;
            }),
        body('password', 'Please enter password length greater then 6 and Number value are used for password').isLength({ min: 5 }).isAlphanumeric()
    ]
    , AuthController.postSignUp);
router.get('/reset', AuthController.getReset);
router.get('/reset/:token', AuthController.getNewPassowrd);
router.post('/reset/:token', AuthController.getNewPassowrd);
router.post('/reset', AuthController.postReset);
router.get('/logout', isAuth, AuthController.logout);

module.exports = router; 