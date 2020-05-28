const router = require('express').Router();
const jwt=require('jsonwebtoken');
const passport = require('passport');
const mongoose=require('mongoose');
const userModel=mongoose.model('user');

exports.login= function(req, res) {
    if(req.body.username && req.body.password) {
        passport.authenticate('local', (error, user) => {
            if(error) {
                return res.status(403).send({error: error});
            } else {
                req.logIn(user, (error) => {
                    if(error) return res.status(500).send({data: error});
                    const accessToken=jwt.sign({userId: user._id}, process.env.JWT_SECRET);
                    userModel.findByIdAndUpdate(user._id, {accessToken});
                    return res.status(200).send({data: "login successful"});
                });
            }
        })(req, res);
    } else {
        res.status(400).send({error: "wrong username or password"});
    }
}

exports.register=function(req, res) {
    if(req.body.username && req.body.password) {
        const user=new userModel({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role || 'user'
        });
        if (user.role=='user') {
            user.score=0;
        }
        const accessToken=jwt.sign({userId: user._id}, process.env.JWT_SECRET)
        user.accessToken=accessToken;
        user.save(function(error){
             if (error) return res.status(500).send({error: error});
             return res.status(200).send({data: 'Registration successful'});
        });
     } else {
     return res.status(400).send({error: "username or passwors is missing"});
     }
}

exports.logout=function(req, res) {
    console.log(req.session.passport.user);
    if(req.isAuthenticated()) {
        req.logout();
        res.status(200).send({data: "log out is successful"});
    } else {
        res.status(403).send({error: "log in before you log out"})
    }
}

exports.listAllUserWithScore=async(req, res, next)=> {
    const users=await userModel.find({role: "user"} ,{_id: 1, username: 1, score:1, role: 1});
    res.status(200).json({
        data: users
    });
}

exports.updateScore = async(req, res, next)=>{
    try {
        const score=req.body.score;
        const userId=req.body.userId;
        const oldUser=await userModel.findById(userId);
        let newscore=await oldUser.score+score;
        await userModel.findByIdAndUpdate(userId, {score: newscore});
        const user=await userModel.findById(userId);
        res.status(200).json({
            data: user
        });
    } catch(error) {
       next(error); 
    }
}

exports.deleteUser=async(req, res, next)=>{
    try {
        const userId=req.params.userId;
        await userModel.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: "User has been deleted"
        });

    } catch(error) {
        next(error);
    }
}