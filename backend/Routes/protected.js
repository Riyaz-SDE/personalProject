const express = require('express')
const app = express.Router()
const jwt = require('jsonwebtoken')
const path = require('path')
const User = require('../model')
app.use('/uploads',express.static(path.join(path.dirname(__dirname),'uploads')))
app.get('/',async(req,res)=>{
    
    // console.log( req.headers.authorization.split(" ")[1]);
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,"q1q1q1",async(err,decode)=>{
        if(err) return
        else{
            console.log(decode);
            const data = await User.findById(decode.userId)
            res.json(data)
            // const abpath = path.join(__dirname,'uploads',data.name)
            // express.static(abpath)
        }
    })
})
module.exports =app