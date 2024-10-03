const express = require('express')
const app = express.Router()
const jwt = require('jsonwebtoken')
const path = require('path')
const User = require('../../model/model')
const authentication = require('../../middleware/authentication')

// app.use('/uploads',express.static(path.join(path.dirname(path.dirname(__dirname)),'uploads')),()=>{
//     console.log(path.join(path.dirname(path.dirname(__dirname)),'uploads'));
// })
// app.use('/',authentication)
app.get('/', async(req,res)=>{
    console.log('pop');
    // console.log( req.headers.authorization.split(" ")[1]);
    // check the token via sended on header from frontend and verify it
    // if(!req.headers.authorization) {
    //     res.status(401).json({status : 'unauthorised access'})
    //     return
    // }
    // const token = req.headers.authorization.split(" ")[1]
    // const verify = jwt.verify(token,"q1q1q1",async(err,decode)=>{
    //     if(err) {
    //         res.status(401).json({status : 'invalid token'})
    //         return
    //     }
    //     else{
    //         console.log(decode);
    //         const data = await User.findById(decode.userId)
            console.log(req.dataFromMiddleware,'middleware');
            res.status(200).json(req.dataFromMiddleware)
            // const abpath = path.join(__dirname,'uploads',data.name)
            // express.static(abpath)
        // }
    // })
})
module.exports =app