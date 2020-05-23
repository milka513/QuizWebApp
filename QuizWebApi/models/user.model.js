const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    username: {type: String, unique: true,required:true},
    password: {type: String, required: [true, 'Password is missing']},
    role:{type:String, default: 'user'}
});

userSchema.pre('save', function(next){
    const user=this;
    if (user.isModified('password')) {
        
        bcrypt.genSalt(10, function(error, salt){
            if (error) return next('Error occurs during generating bcrypt');
            bcrypt.hash(user.password, salt, function(error, hash){
                console.log(hash+' '+salt+' '+user.password)
                if (error) return next('Error occurs during hashing password');
                user.password=hash;
                return next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.verifyPasswords=function(password, next) {
    bcrypt.compare(password, this.password, function(error, isMatching){
        return next(error, isMatching);
    });
}

mongoose.model('user', userSchema);