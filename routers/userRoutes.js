'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/register', UserController.registerForm);
router.post('/register', UserController.registerPost);
router.get('/login', UserController.loginForm);
router.post('/login', UserController.loginPost);
router.get('/logout', UserController.logout);

router.get('/profile', UserController.profilePage);
router.get('/histories/:id/invoice', UserController.downloadInvoice);

module.exports = router;