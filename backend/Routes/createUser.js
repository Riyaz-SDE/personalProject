const express = require('express')
const bcryt = require('bcrypt')
const path = require('path')
const routes = express.Router()
const fs = require('fs')
const User = require('../model/model')

// routes.use(express.urlencoded({extended:false}))
// routes.use(express.json())

/**
 * this will create user account by accepting 
 * @param {String} name
 * @param {String} password
 * and the create folder for user that user 
 *  folder name : user_name 
 */
routes.post('/',async(req,res)=>{
    
    const {name,password} =  req.body
    console.log(name,password,req.body, '===start===')
    
    // validates whether its empty or not
    if((name === "" || password === "")){
        res.json({status:"empty"})
        console.log('lop');
        return
    }
    const isUserNameExist = await User.findOne({name})
    console.log(isUserNameExist);

    // element duplicate user names
    if(isUserNameExist){
        console.log('userName alredy exist');
        res.status(202).json({status:'user already exist'})
        return
    }
    
        // creates file path for user  
        // ===========================================
        let filepath =  path.join(path.dirname(__dirname),'uploads',name)
        fs.mkdir(filepath, (err) => {
            if (err) {
                console.log(err, 'error occured')
            }
            else {
                console.log('folder created')
            }
        })
        // ===========================================
        // encrypt the password
        const hash = await bcryt.hash(password,10)
        // insert the user data in db
        const login = await User.insertMany(
            {
                name:name,
                password:hash,
                path:filepath,
                profile:{//     fileName:"DEFAULT.webp",//     path:"" 
                    
                }
                })
        res.status(200).json({status:'success'})
})
module.exports = routes