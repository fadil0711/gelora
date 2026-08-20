'use strict';

const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { isCommentOwner } = require('../helpers/auth');

router.get('/:id/edit', isCommentOwner, CommentController.editForm);
router.post('/:id/edit', isCommentOwner, CommentController.editPost);
router.get('/:id/delete', isCommentOwner, CommentController.deleteComment);

module.exports = router;