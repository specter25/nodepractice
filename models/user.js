const mongoose=require('mongoose');
const validator=require('validator');
const Schema = mongoose.Schema;
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:(value)=>{
                return validator.isEmail(value);
            },
            message:`{value} is not a valid email`
        }

    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            require:true
        },
        token:{
            type:String,
            require:true
        }
    }]
})
const User= mongoose.model('User', userSchema);
module.exports={ 
    User:User
}
