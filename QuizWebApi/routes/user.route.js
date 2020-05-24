const router = require('express').Router();
const jwt=require('jsonwebtoken');
const passport = require('passport');
const mongoose=require('mongoose');
const userModel=mongoose.model('user');
const userController=require('../controllers/user.controller');


router.route('/login').post(userController.login);

router.route('/register').post(userController.register);

router.route('/logout').post(userController.logout);

router.route('/listallscores').get(userController.listAllUserWithScore);

module.exports = router;