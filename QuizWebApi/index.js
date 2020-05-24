const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const mongoose=require('mongoose');
const cors= require('cors');
require('dotenv').config()

const database_config=require('./config/database')
const app=express();


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



app.use(cors());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const authenticate=(req, res, next) => {
    if(!req.isAuthenticated()) {
        res.status(403).send('You are not allowed');
    } else {
        next();
    }
}

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