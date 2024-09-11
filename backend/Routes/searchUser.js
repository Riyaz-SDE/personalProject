const express = require('express')
const router = express.Router()
const User = require('../model/model')

router.post('/',async(req,res)=>{
    // const {search} = req.body
    try{
        const search = 'sa'
    console.log(search);
    const regexPattern = new RegExp(search, 'i');
    const data = await User.find({name:regexPattern})
    console.log(data);
    res.json(data)
    }
    catch(err){
        res.json({error:err})
    }
})
module.exports = router