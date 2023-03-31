const path = require('path');
const express = require('express');
const AuthController = require('../controllers/AuthController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/login', AuthController.getLogin);
router.get('/signUp', AuthController.getSignUp);
router.post('/login', AuthController.postLogin);
router.post('/signUp', AuthController.postSignUp);
router.get('/reset',  AuthController.getReset);
router.post('/reset',  AuthController.postReset);
router.get('/logout', isAuth, AuthController.logout);

module.exports = router; 