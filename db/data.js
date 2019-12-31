 

const Schema = mongoose.Schema;
const todoSchema=new Schema({
    text:{
        type:String
    },
    completed:{
        type:Boolean
    },
    completedAt:{
        type:Number
    }
})
const Todo= mongoose.model('Todo', todoSchema);

var newTodo=new Todo({
    text:'Do Coding'
});
newTodo.save().then((todo)=>{
    console.log("saved the todo "+ todo);
},(e)=>{
    console.log('unable to save the todo');
});
