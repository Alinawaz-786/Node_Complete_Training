const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../../models/user');
const authContoller = require('../../controllers/api/AuthApiController');

router.post('/signup', [
    body('email').isEmail().withMessage('Please Enter a valid Email.').custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('Email Address already exist.!')
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
], authContoller.signUp);

router.post('/login', authContoller.login);

module.exports = router;