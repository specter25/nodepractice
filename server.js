const mongoose=require('mongoose');
var {Todo} =require('./models/todo');
const express=require('express');
const {ObjectId}=require('mongodb');
const _=require('lodash');
const {User}=require('./models/user');

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
            return res.status(404).send();
        }
        res.send({todo:todo});
    }).catch((e)=>
    {return res.status(404).send(e);})
})
router.delete('/todos/:id',(req,res)=>{
    let id=req.params.id;
    if(!ObjectId.isValid(id))
    {
        return res.status(404).send();
    }   
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.send().status(404);
        }
        res.send({todo:todo});
    }).catch((e)=>
    {return res.status(404).send(e);})
});
router.put('/todos/:id',(req,res)=>{
    let id=req.params.id;
    var body= _.pick(req.body , ['text','completed']);
    if(!ObjectId.isValid(id))
    {
        return res.status(404).send();
    }   
    if(_.isBoolean(body.completed)&& body.completed){
        body.completedAt=new Date().getTime();
    }
    else{
        body.completed=false;
        body.completedAt=null;
    }
    Todo.findByIdAndUpdate(id ,req.body).then(()=>{
        Todo.findById(id).then((todo)=>{
            if(!todo){
                return res.send().status(404);
            }
            res.send({todo});
        }).catch((e)=>{
            return res.status(404).send(e);
        })
    })
});

router.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);
    user.save().then((user)=>{
        res.send(user);
    }).catch((e)=>{
        res.status(404).send(e);
    })
})

    


module.exports=router;