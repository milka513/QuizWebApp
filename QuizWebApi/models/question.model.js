const mongoose=require('mongoose');

const QuestionSchema=new mongoose.Schema({
    title: {
        type: String
    },
    answers: {
        type: [{
            type: String
        }],
        validate: [arrayLimit, "{PATH} exceed the limit of 4"]
    },
    correctNum: {type: Number, min: 1, max: 4}
});

function arrayLimit(val) {
    return val.length<=4;
}


mongoose.model('question', QuestionSchema);