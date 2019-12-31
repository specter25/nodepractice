const mongoose=require('mongoose');
var {Todo} =require('./models/todo');
const express=require('express');
const {ObjectId}=require('mongodb');


var router=express.Router();


router.post('/todos',(req,res,next)=>{
    Todo.create(req.body).then(function(todo){
        res.send(todo);
    }).catch(next);
    });

router.get('/todos', (req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos:todos});
    },(e)=>{
        res.status(400).send(e);
    })
})

router.get('/todos/:id',(req,res)=>{
    let id=req.params.id;
    if(!ObjectId.isValid(id))
    {
        return res.status(404).send();
    }   
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.send().status(404);
        }
        res.send({todo:todo});
    }).catch((e)=>
    {return res.status(404).send();})
})

    


module.exports=router;