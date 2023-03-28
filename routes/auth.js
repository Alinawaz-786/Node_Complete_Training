const path = require('path');
const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.get('/login', AuthController.getLogin);
router.get('/signUp', AuthController.getSignUp);
router.post('/login', AuthController.postLogin);
router.post('/signUp', AuthController.postSignUp);
router.get('/logout', AuthController.logout);

module.exports = router; 