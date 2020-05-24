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

exports.getQuestion= async (req, res, next)=>{
    try {
        const questionId=req.params.questionId;
        const question=await questionModel.findById(questionId);
        if (!question) return next(new Error('Question does not exist'));
        res.status(200).json({
            data: question
        });
    } catch (error) {
        next(error);
    }
}

exports.updateQuestion =async(req, res, next)=> {
    try {
        const {title, answers, correctNum}=req.body;
        if (!answers || !title || !correctNum)
            return res.status(400).json({error: 'Missing attribute for question'});
        const questionId=req.params.questionId;
        await questionModel.findByIdAndUpdate(questionId, {title:title, answers:answers, correctNum:correctNum});
        const question=await questionModel.findById(questionId);
        res.status(200).json({
            data: question
        }); 
    } catch (error) {
        next(error);
    }
}

exports.authenticate=async (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.status(403).send({error: 'You are not allowed'});
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
           if (error) return res.status(500).send({error: error}); 
           res.status(200).json({
                data: question
            });
        })
        
    } catch(error) {
        next(error);
    }
}
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

exports.listSpecNumberOfQuestions=async (req, res, next)=>{
    try {
        const number=req.body.num;
        let questionArray=[];
        await questionModel.find({}, function(err, arr){
            questionArray=arr;
            console.log(arr);
        });
        if (number>questionArray.size){
            return next(new Error('Too big size for random list.'));
        }
        const randomList=await getRandomSubarray(questionArray, number);
        res.status(200).json({
            data: randomList
        });
    } catch(error) {
        next(error);
    }

}