const router = require('express').Router();
const jwt=require('jsonwebtoken');
const passport = require('passport');
const mongoose=require('mongoose');
const userModel=mongoose.model('user');


router.route('/login').post((req, res) => {
    if(req.body.username && req.body.password) {
        passport.authenticate('local', (error, user) => {
            if(error) {
                return res.status(403).send({msg: error});
            } else {
                req.logIn(user, (error) => {
                    if(error) return res.status(500).send({msg: error});
                    const accessToken=jwt.sign({userId: user._id}, process.env.JWT_SECRET);
                    userModel.findByIdAndUpdate(user._id, {accessToken});
                    return res.status(200).send({msg: "login successful"});
                });
            }
        })(req, res);
    } else {
        res.status(400).send({msg: "wrong username or password"});
    }
});

router.route('/register').post((req, res) => {
    if(req.body.username && req.body.password) {
       const user=new userModel({
           username: req.body.username,
           password: req.body.password,
           role: req.body.role || 'user'
       });
       const accessToken=jwt.sign({userId: user._id}, process.env.JWT_SECRET)
       user.accessToken=accessToken;
       user.save(function(error){
            if (error) return res.status(500).send({msg: error});
            return res.status(200).send({msg: 'Registration successful'});
       });
    } else {
    return res.status(400).send({msg: "username or passwors is missing"});
    }
    
});

router.route('/logout').post((req, res) => {
    console.log(req.session.passport.user);
    if(req.isAuthenticated()) {
        req.logout();
        res.status(200).send({msg: "log out is successful"});
    } else {
        res.status(403).send({msg: "log in before you log out"})
    }
});

module.exports = router;