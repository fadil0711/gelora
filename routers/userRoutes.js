'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { isLogin } = require('../helpers/auth');

router.get('/register', UserController.registerForm);
router.post('/register', UserController.registerPost);
router.get('/login', UserController.loginForm);
router.post('/login', UserController.loginPost);
router.get('/logout', UserController.logout);

router.get('/profile', isLogin, UserController.profilePage);
router.get('/histories/:id/invoice', isLogin, UserController.downloadInvoice);

module.exports = router;