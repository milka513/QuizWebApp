const express= require('express');
const router=express.Router();
const questionController=require('../controllers/question.controller')

router.route('/addquestion').post( questionController.authenticate, questionController.grantAccess('updateAny','question'), questionController.addQuestion);
router.route('/getquestions').get(questionController.authenticate, questionController.grantAccess('readAny', 'question'), questionController.getQuestions);
module.exports=router;