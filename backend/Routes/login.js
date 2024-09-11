const express =require('express')
const route = express.Router()
const bcryt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/model')

route.post('/',async(req,res)=>{
    try{
        const { name , password } =  req.body;
        // name, password validator
        if(name === '' || password === ''){
            res.status(401).json({status : 'name or password is empty'})
            return
        }
        // look up the user data from DB
        const user = await User.find({name})
        console.log("user lookup data",user);

        // run if use not found
        if(user.length === 0){
            res.status(404).json({error:'not found'})
            return 
        }
        // else
        console.log(user,password);
        // password decrypting and comparing using bcrypt
        const isPassvalid =  bcryt.compare(password,user[0].password)
        if(!isPassvalid){
            res.status(401).json({error:"invalid password"})
            return 
        }
        // else generate token
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