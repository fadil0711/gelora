'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const MountainController = require('../controllers/MountainController');
const CommentController = require('../controllers/CommentController');
const { isLogin, isAdmin, isCommentOwner } = require('../helpers/auth');


router.get('/', UserController.landingPage);

router.get('/register', UserController.registerForm);
router.post('/register', UserController.registerPost);
router.get('/login', UserController.loginForm);
router.post('/login', UserController.loginPost);
router.get('/logout', UserController.logout);
router.get('/mountains/:id', MountainController.detailPage);

// mulai dari sini wajib login
router.use(isLogin);

router.get('/profile', UserController.profilePage);
router.get('/histories/:id/invoice', UserController.downloadInvoice);

router.get('/mountains', MountainController.listPage);
router.get('/mountains/add', isAdmin, MountainController.addForm);
router.post('/mountains/add', isAdmin, MountainController.addPost);
router.get('/mountains/:id/edit', isAdmin, MountainController.editForm);
router.post('/mountains/:id/edit', isAdmin, MountainController.editPost);
router.get('/mountains/:id/delete', isAdmin, MountainController.deleteMountain);
router.get('/mountains/:id/educations/add', isAdmin, MountainController.addEducationForm);
router.post('/mountains/:id/educations/add', isAdmin, MountainController.addEducationPost);
router.post('/mountains/:id/histories', UserController.addHistory);

router.post('/mountains/:id/comments', CommentController.addComment);
router.get('/comments/:id/edit', isCommentOwner, CommentController.editForm);
router.post('/comments/:id/edit', isCommentOwner, CommentController.editPost);
router.get('/comments/:id/delete', isCommentOwner, CommentController.deleteComment);

module.exports = router;
