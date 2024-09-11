
const express = require('express');
const router = express.Router();    
// const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../model/model')
// uploads
router.post('/',require('../middleware/upload').authMiddleware,require('../middleware/upload').uploads.single("ProfilePic"),async(req,res)=>{
    try{
    console.log(req.file);
    console.log(req.query.name);
    // const file = await User.find({"name":req.query.name})
    // console.log(file);
    // const fileUpload = await User.updateOne({"name":req.customData.token.name},
    const fileUpload = await User.updateOne({"name":req.customData.token.name},
    {"$set":{"profile.path" : req.file.path,"profile.fileName":req.file.filename}})

    console.log(fileUpload);
    if(fileUpload.modifiedCount===0){
        res.status(404).json({error:'not changed'})
        return 
    }
    // res.status(200).json({message:'corect'})
        }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

module.exports = router