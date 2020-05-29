const express= require('express');
const router=express.Router();
const questionController=require('../controllers/question.controller')

router.route('/addquestion').post( questionController.authenticate, questionController.grantAccess('updateAny','question'), questionController.addQuestion);
router.route('/getquestions').get(questionController.authenticate, questionController.grantAccess('readAny', 'question'), questionController.getQuestions);
router.route('/updatequestion/:questionId').put(questionController.authenticate, questionController.grantAccess('updateAny','question'), questionController.updateQuestion);
router.route('/getquestion/:questionId').get(questionController.authenticate, questionController.grantAccess('readAny', 'question'), questionController.getQuestion);
router.route('/listspecnumquestions').post(questionController.authenticate, questionController.listSpecNumberOfQuestions);
router.route('/deletequestion/:questionId').delete(questionController.authenticate, questionController.grantAccess('updateAny', 'question'), questionController.deleteQuestion);

module.exports=router;