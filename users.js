const express= require('express');
const router = express.Router();
const User = require('../models/user')
router.get('/',async (req, res) =>{
    try{
const users=await User.find();
res.json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})


router.get('/:id', getUsers, (req, res) =>{
    res.send(res.user);
})

router.post('/',async (req, res) =>{
    const user=new User({
        name: req.body.name,
        emailId:req.body.emailId,
        phoneNumber:req.body.phoneNumber,
        location:req.body.location,
    })
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message: err.message});

    }
})

router.patch('/:id', getUsers, async (req, res) =>{
    if(req.body.name!=null){
        res.user.name=req.body.name;
    }
    if(req.body.emailId!=null){
        res.user.emailId=req.body.emailId;
    }
    if(req.body.phoneNumber!=null){
        res.user.phoneNumber=req.body.phoneNumber;
    }
    if(req.body.location!=null){
        res.user.location=req.body.location;
    }
try{
    const updateUser = await res.user.save();
    res.json(updateUser);
}catch(err){
    res.status(400).json({ message: err.message })
}
})

router.delete('/:id', getUsers, async (req,res) =>{
    try{
        await res.user.remove();
        res.json({ message: "Deleted User"})
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

async function getUsers(req,res, next){
    let user;
    try{
        user = await User.findById(req.params.id);
        if(user==null){
            return res.status(404).json({message: 'Cannot find Users'})
        }
    }catch(err){
        return res.status(500).json({ message: err.message})
    }
    res.user=user;
    next();
}
module.exports=router

