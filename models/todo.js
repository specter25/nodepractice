const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TodoSchema=new Schema({
    text:{
        type:String,
        required:true,
        minlenght:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
})
const Todo= mongoose.model('Todo',TodoSchema);
module.exports = {Todo};
