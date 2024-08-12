const express =require('express')
const route = express.Router()
const bcryt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model')

route.post('/',async(req,res)=>{
    try{
        console.log('l');
    const { name , password } =  req.body;
    const user = await User.find({name})
    console.log(user);
    if(
        user.length === 0){
        res.status(404).json({error:'not found'})
        return 
    }
    console.log(user,password);
    const isPassvalid =  bcryt.compare(password,user[0].password)
    if(!isPassvalid){
        res.status(401).json({error:"invalid password"})
        return 
    }
    // console.log(user[0]._id,'lllll');
    // generate token
    const token = jwt.sign({userId:user[0]._id},"q1q1q1");
    res.json({token})
}
    catch(err){
        console.log(err);
        res.status(500).send("internal server error")
    }
})
module.exports= route