const router = require('express').Router();
const jwt=require('jsonwebtoken');
const passport = require('passport');
const mongoose=require('mongoose');
const userModel=mongoose.model('user');
const userController=require('../controllers/user.controller');
const quesitonController=require('../controllers/question.controller');


router.route('/login').post(userController.login);

router.route('/register').post(userController.register);

router.route('/logout').post(userController.logout);

router.route('/listallscores').get(quesitonController.authenticate,quesitonController.grantAccess('readAny', 'scores'), userController.listAllUserWithScore);

router.route('/updatescore').put(quesitonController.authenticate, userController.updateScore);

router.route('/deleteuser/:userId').delete(quesitonController.authenticate, quesitonController.grantAccess('updateAny', 'scores'), userController.deleteUser);
module.exports = router;