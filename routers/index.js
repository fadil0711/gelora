'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const MountainController = require('../controllers/MountainController');
const { isLogin } = require('../helpers/auth');

const userRoutes = require('./userRoutes');
const mountainRoutes = require('./mountainRoutes');
const commentRoutes = require('./commentRoutes');

router.get('/', UserController.landingPage);
router.use('/', userRoutes); 
router.get(/^\/mountains\/(?<id>\d+)$/, MountainController.detailPage);

router.use(isLogin);

router.use('/mountains', mountainRoutes);
router.use('/comments', commentRoutes);

module.exports = router;