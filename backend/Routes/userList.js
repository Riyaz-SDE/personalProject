const express = require('express')
const router = express.Router()
const Users = require('../model')
router.get('/',async(req,res)=>{
    try {
        const search = req.query.search || 0
        console.log(search);
        
        let data = await Users.find({},{password:false})
        // let data = await Users.find({},{password:false}).skip(search * 2).limit(2)
        // console.log(data[1],data[1].profile.path.split('\\'));
        if(!data) return res.statusCode(404)
        res.json(data)
    } catch (error) {
        console.log(error);
    }
})
module.exports=router