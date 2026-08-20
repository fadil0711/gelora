'use strict';

const express = require('express');
const router = express.Router();
const MountainController = require('../controllers/MountainController');
const UserController = require('../controllers/UserController');
const CommentController = require('../controllers/CommentController');
const { isAdmin } = require('../helpers/auth');

router.get('/', MountainController.listPage);

router.get('/add', isAdmin, MountainController.addForm);
router.post('/add', isAdmin, MountainController.addPost);
router.get('/:id/edit', isAdmin, MountainController.editForm);
router.post('/:id/edit', isAdmin, MountainController.editPost);
router.get('/:id/delete', isAdmin, MountainController.deleteMountain);

router.get('/:id/educations/add', isAdmin, MountainController.addEducationForm);
router.post('/:id/educations/add', isAdmin, MountainController.addEducationPost);

router.post('/:id/histories', UserController.addHistory);
router.post('/:id/comments', CommentController.addComment);

module.exports = router;