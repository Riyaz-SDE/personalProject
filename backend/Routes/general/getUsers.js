const express = require('express');
const User = require('../../model/model');
const router = express.Router()

// router.get('/',require('../controller/getUser'))
router.get('/',async(req,res)=>{
    try{
        const userUniqueId =  req.query.id
        console.log(userUniqueId,req.params);

        if(userUniqueId.length !== 24){
            res.status(404).json({status : 'invalid user id'})
            return
        }
        
        const data = await User.findById(userUniqueId)
        console.log(data);

        if(data === null){
            res.status(404).json({status : 'user not found'})
            return
        }
        res.status(200).json({data:data})   
        // res.json({data:'l'})
    }
    catch(err){
        console.log(err);
    }
    
})
module.exports= router