const express=require('express');
const routes=require('./server');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
mongoose.Promise = global.Promise ; 



mongoose.connect('mongodb://localhost/todoapp') ;
mongoose.connection.once('open', ()=>{
    console.log('connection made')
}).on('error',(err)=>{
    console.log(err);
})

var app=express();

app.use(bodyParser.json());


app.use('/todoapp', routes );

app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
  });

app.listen(3000,()=>{
    console.log('listening to port 3000');
});