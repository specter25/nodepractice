const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1

    }
})
const User= mongoose.model('Todo', userSchema);
module.exports={
    User:User
}
