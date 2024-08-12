const express = require('express')
const bcryt = require('bcrypt')
const path = require('path')
const routes = express.Router()
const fs = require('fs')
const User = require('../model')

// routes.use(express.urlencoded({extended:false}))
// routes.use(express.json())
routes.post('/',async(req,res)=>{
    // console.log(req.body);
    // const data = await req.body
    const {name,password} =  req.body
    console.log(name,password)
    
    if((name===""&&password==="")){
        res.json({status:"empty"})
        console.log('lop');
        return
    }
    // else{
        let filepath =  path.join(path.dirname(__dirname),'uploads',name)
        fs.mkdir(filepath, (err) => {
        if (err) {
            console.log(err, 'error occured')
        }
        else {
            console.log('folder created')
        }
    })
        const hash = await bcryt.hash(password,10)
        const login = await User.insertMany({name:name,password:hash,path:filepath,profile:{fileName:"DEFAULT.webp",path:""}})
        res.status(200).json({status:'success'})
    // }
})
module.exports = routes