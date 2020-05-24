const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const questionModel=mongoose.model('question');
const userModel=mongoose.model('user');
const {roles}=require('../models/roles');

exports.grantAccess=function(action, resource) {
    return async (req, res, next)=>{
        try {
            const permission=roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You dont have enough permission to perform this action."
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

exports.getQuestions=async (req, res, next)=>{
    const questions=await questionModel.find({});
    res.status(200).json({
        data: questions
    });
}

exports.authenticate=async (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.status(403).send('You are not allowed');
    } else {
        next();
    }
}

exports.addQuestion=async (req, res, next)=>{
   try {
        const {title, answers, correctNum}=req.body;
        if (!answers || !title || !correctNum)
            return res.status(400).json({error: 'Missing attribute for question'});
        const question=new questionModel({
            title: title,
            answers: answers,
            correctNum: correctNum
        });
        question.save(function(error){
           if (error) return res.status(500).send({msg: error}); 
           res.status(200).json({
                msg: question
            });
        })
        
    } catch(error) {
        next(error);
    }
}
