const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const mongoose=require('mongoose');
const mongodb=require('mongodb').MongoClient;
const cors= require('cors');
const fs=require('fs')
const excel=require('exceljs')
require('dotenv').config()

const database_config=require('./config/database')
const app=express();

if (process.env.DEBUG_QUIZ) {
    mongodb.connect(
        process.env.DATABASE_URL,
        {useNewUrlParser:true, useUnifiedTopology:true},
        (err, client)=>{
            if (err) throw err;

            client
            .db('test')
            .collection('questions')
            .find({}, {title: 1, answers: 1, correctNum: 1, _v:0})
            .toArray((err, data)=>{
                if (err) throw err;
                console.log(data);
                let workbook=new excel.Workbook();
                let worksheet=workbook.addWorksheet('Questions');
                worksheet.columns=[
                    {header: 'title', key: 'title'},
                    {header: 'answers', key: 'answers'},
                    {header: 'correctNum', key: 'correctNum'},
                ];
                worksheet.addRows(data);
                workbook.xlsx.writeFile('questions.xls')
                .then(function(){
                    console.log('file saved!');
                })
                client.close();
            })
        }
    )
    return;
}

require('./models/user.model');
require('./models/question.model');

const user=mongoose.model('user');

console.log(process.env.PORT);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', ()=>{
    console.log("There was an error in the database");
})

mongoose.connection.on('connected', ()=>{
    console.log("The connection to the database was successful");
})

var whitelist = ['http://localhost:4200/login', 'http://localhost:4200/main', 'http://localhost:4200'] 
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

//app.use(cors());//! ideiglenesen csak
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



passport.serializeUser((user, done) => {
    if(!user) return done("Missing credentials", undefined);
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    if(!user) return done("You cant log out because you were never logged in", undefined);
    return done(null, user);
});

passport.use('local', new localStrategy((username, password, done)=>{
    user.findOne({username: username}, function(err, user){
            if (err) return done('Error occurs finding the user', undefined);

            if (user) {
                user.verifyPasswords(password, function(err, isMatch){
                    if (err || !isMatch) return done('Password is wrong');
                    return done(null, user);
                });
            } else {
                return done('The username is wrong or not exists', undefined);
            }
    });

}));

console.log(database_config.secret);
app.use(expressSession({secret: database_config.secret}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/server/user', require('./routes/user.route'));
app.use('/server/question', require('./routes/question.route'));

app.listen(process.env.PORT, ()=> {
    console.log("The API is running....");
});