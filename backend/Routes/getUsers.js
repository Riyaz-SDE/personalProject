const express = require('express');
const User = require('../model');
const router = express.Router()

// router.get('/',require('../controller/getUser'))
router.get('/',async(req,res)=>{
    try{
        const idk =  req.query.id
    console.log(idk,req.params);
    const data = await User.findById(idk)
    // console.log(data);
    res.json({data:data})   
    // res.json({data:'l'})
    }
    catch(err){
        console.log(err);
    }
    
})
module.exports= router